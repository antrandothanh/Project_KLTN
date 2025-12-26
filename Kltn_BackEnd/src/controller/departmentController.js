import pool from "../config/db.js"
import { v4 as uuidv4 } from "uuid"

// Tạo phòng ban mới
export async function createDepartment(req, res) {
    try {
        const { name, departmentCode } = req.body;
        const id = uuidv4();
        await pool.execute(
            "insert into departments (id, name, department_code)"
            + " values (?, ?, ?)",
            [id, name, departmentCode]
        );
        const newDepartment = {
            id,
            name,
            departmentCode
        }
        return res.status(201).json({
            message: "Phòng ban được tạo thành công",
            newDepartment: newDepartment
        });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
}

export async function getAllDepartments(req, res) {
    try {
        const [rows] = await pool.query("SELECT * FROM departments");
        return res.status(200).json(rows);
    } catch (err) {
        return res.status(500).json({ message: "Không lấy được danh sách phòng ban" });
    }
}