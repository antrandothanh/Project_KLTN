import express from "express";
import { createDepartment, getAllDepartments } from "../controller/departmentController.js";
import { authenticateToken } from "../controller/authController.js"

const router = express.Router();

router.post("/", authenticateToken, createDepartment);
router.get("/", authenticateToken, getAllDepartments);

export default router