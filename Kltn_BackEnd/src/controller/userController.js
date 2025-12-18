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
        const { employeeCode, fullName, email, dob, address, position, departmentId, faceEnrolled, password } = req.body
        const id = uuidv4()
        const passwordEncrypted = await bcrypt.hash(password, 10)
        const createdAt = new Date()
        await pool.execute(
            "insert into users (id, employee_code, full_name, email, dob, address, position, department_id, face_enrolled, created_at, password_encrypted)" 
            + " values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [id, employeeCode, fullName, email, dob, address, position, departmentId, faceEnrolled, createdAt, passwordEncrypted]
        )
        const user = {
            id,
            employeeCode,
            fullName,
            email,
            dob,
            address,
            position,
            departmentId,
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