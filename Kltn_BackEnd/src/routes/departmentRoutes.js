import express from "express";
import { createDepartment } from "../controller/departmentController.js";

const router = express.Router();

router.post("/", createDepartment);

export default router