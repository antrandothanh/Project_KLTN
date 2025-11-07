import pool from "../config/db.js"
import { v4 as uuidv4 } from "uuid";

export async function getUsers(req, res) {
    try {
        const [rows] = await pool.query("select * from users")
        res.json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

export async function createUser(req, res) {
    try {
        const { employeeCode, fullName, email, position, faceEnrolled, password } = req.body
        const id = uuidv4()
        const createdAt = new Date()
        const user = await pool.execute(
            "insert into users (id, employee_code, full_name, email, position, face_enrolled, created_at, password)" 
            + " values (?, ?, ?, ?, ?, ?, ?, ?)",
            [id, employeeCode, fullName, email, position, 0, createdAt, password]
        )
        res.status(201).json({
            message: "User created successfully",
            user: user
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}