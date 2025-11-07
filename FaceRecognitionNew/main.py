import base64
import io
import json

import mysql.connector
import numpy as np
import torch
from PIL import Image
from facenet_pytorch import MTCNN, InceptionResnetV1
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

# Allow React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models once
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
mtcnn = MTCNN(image_size=160, margin=0, min_face_size=40, device=device)
resnet = InceptionResnetV1(pretrained='vggface2').eval().to(device)

# Database connection info
DB_CONFIG = {
    "host": "localhost",
    "user": "root",
    "password": "root",
    "database": "face_embedding_demo",
}


def get_connection():
    return mysql.connector.connect(**DB_CONFIG)


class FaceRegister(BaseModel):
    username: str
    image_base64: str

class FaceCheckIn(BaseModel):
    image_base64: str


def get_embedding_from_base64(image_base64):
    # Remove "data:image/xxx;base64," if exists
    if "," in image_base64:
        image_base64 = image_base64.split(",")[1]
    image_bytes = base64.b64decode(image_base64)
    img = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    face = mtcnn(img)
    if face is None:
        return None

    face = face.unsqueeze(0).to(device)
    emb = resnet(face)
    return emb.detach().cpu().numpy()[0]


def cosine_similarity(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))


@app.post("/register-face")
async def register_face(data: FaceRegister):
    embedding = get_embedding_from_base64(data.image_base64)
    if embedding is None:
        return {"success": False, "message": "No face detected"}

    conn = get_connection()
    cursor = conn.cursor()
    sql = "INSERT INTO trained_face (username, embedding) VALUES (%s, %s)"
    cursor.execute(sql, (data.username, json.dumps(embedding.tolist())))
    conn.commit()
    conn.close()

    return {"success": True, "message": "Face registered successfully"}


@app.post("/checkin")
async def checkin(data: FaceCheckIn):
    current_emb = get_embedding_from_base64(data.image_base64)
    if current_emb is None:
        return {"success": False, "message": "No face detected"}

    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT username, embedding FROM trained_face")
    rows = cursor.fetchall()
    conn.close()

    best_match = None
    best_score = 0

    for row in rows:
        saved_emb = np.array(json.loads(row["embedding"]))
        similarity = cosine_similarity(saved_emb, current_emb)
        if similarity > best_score:
            best_score = similarity
            best_match = row["username"]

    if best_score > 0.6:
        return {
            "success": True,
            "username": best_match,
            "similarity": float(best_score),
            "message": "Face matched successfully"
        }
    else:
        return {
            "success": False,
            "similarity": float(best_score),
            "message": "No matching face found"
        }
