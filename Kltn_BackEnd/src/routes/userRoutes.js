import express from "express"
import { getUsers, createUser } from "../controller/userController.js"
import { authenticateToken } from "../controller/authController.js"

const router = express.Router()

router.get("/", authenticateToken, getUsers)
router.post("/", authenticateToken, createUser)

export default router