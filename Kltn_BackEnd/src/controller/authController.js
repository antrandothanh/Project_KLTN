import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'


dotenv.config()

// Đăng nhập tài khoản người dùng
export async function login(req, res) {
    try {
        const { emailInput, passwordInput } = req.body
        // kiểm tra người dùng có tồn tại trong db bằng email
        const [users] = await pool.query("select * from users")
        const userExisted = users.find(user => user.email === emailInput) || null
        if (userExisted === null) {
            res.status(404).json({
                message: 'User not found',
            })
        }

        // Nếu người dùng tồn tại, kiểm tra người dùng có nhập đúng mật khẩu không
        const passwordEncrypted = userExisted.passwordEncrypted
        const isMatch = await bcrypt.compare(passwordInput, passwordEncrypted)
        if (!isMatch) {
            res.status(401).json({ message: 'Wrong password' })
        }

        
        const loginInfo = {
            email: userExisted.email,
            employeeCode: userExisted.employee_code
        }
        const accessToken = await generateAccessToken(loginInfo)
        const refreshToken = await generateRefreshToken(loginInfo)
        const id = uuidv4()
        // Lưu refresh token vào database.
        await pool.execute(
            "insert into refresh_token_table (id, user_id, refresh_token)"
            + " values (?, ?, ?)",
            [id, userExisted.id, refreshToken]
        )

        res.status(200).json({
            message: 'Login successfully',
            accessToken: accessToken,
            refreshToken: refreshToken
        })
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
}

async function generateAccessToken(loginInfo) {
    return jwt.sign(loginInfo, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '600s' })
}

async function generateRefreshToken(user) {
    return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET)
}