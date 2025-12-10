import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';

export async function getUsers(req, res) {
    try {
        const [rows] = await pool.query("select * from users")
        res.status(200).json(rows)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// đăng kí người dùng mới
export async function createUser(req, res) {
    try {
        const { employeeCode, fullName, email, position, faceEnrolled, password } = req.body
        const id = uuidv4()
        const passwordEncrypted = await bcrypt.hash(password, 10)
        const createdAt = new Date()
        await pool.execute(
            "insert into users (id, employee_code, full_name, email, position, face_enrolled, created_at, password)" 
            + " values (?, ?, ?, ?, ?, ?, ?, ?)",
            [id, employeeCode, fullName, email, position, 0, createdAt, passwordEncrypted]
        )
        const user = {
            id,
            employeeCode,
            fullName,
            email,
            position,
            faceEnrolled,
            passwordEncrypted
        }
        res.status(201).json({
            message: "User created successfully",
            user: user
        })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}