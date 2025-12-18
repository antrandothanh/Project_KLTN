import pool from "../config/db.js"
import { v4 as uuidv4 } from "uuid"

export async function createDepartment(req, res) {
    try {
        const { name, description } = req.body;
        const id = uuidv4();
        await pool.execute(
            "insert into departments (id, name, description)"
            + " values (?, ?, ?)",
            [id, name, description]
        );
        const newDepartment = {
            id,
            name,
            description
        }
        res.status(201).json({
            message: "Department was created successfully",
            newDepartment: newDepartment
        });
    }
    catch(err) {
        res.status(500).json({ error: err.message });
    }
}