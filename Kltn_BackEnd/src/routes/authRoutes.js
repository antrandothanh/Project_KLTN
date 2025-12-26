import express from "express";
import { login, refreshToken, logout, verify, getRefreshTokenByUserId } from "../controller/authController.js";

const router = express.Router();

router.post("/login", login);
router.post("/refresh-token", refreshToken);
router.delete("/logout", logout);
router.post("/verify", verify)
router.post("/get-refresh-token", getRefreshTokenByUserId)

export default router