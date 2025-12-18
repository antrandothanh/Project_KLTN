import express from "express";
import { login, refreshToken, logout } from "../controller/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.delete("/logout", logout);

export default router