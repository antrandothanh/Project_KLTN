import pool from "../config/db.js";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Đăng nhập tài khoản người dùng
export async function login(req, res) {
  try {
    const { emailInput, passwordInput } = req.body;

    // Giới hạn chỉ cho phép api chạy duy nhất 1 lần
    // nếu lần gửi req trước đó đã thành công.
    // Kiểm tra db có chứa refresh token chưa.
    // Nếu có rồi thì không được gửi req nữa.
    const [refreshTokens] = await pool.query(
      "SELECT * FROM refresh_token_table"
    );
    if (refreshTokens.length > 0) {
      return res.status(403).json({
        message:
          "Trước đó đã có đăng nhập rồi nên không thể đăng nhập lần nữa.",
      });
    }

    // kiểm tra người dùng có tồn tại trong db bằng email.
    const [users] = await pool.query("select * from users");
    const userExisted = users.find((user) => user.email === emailInput) || null;
    if (userExisted === null) {
      return res.status(404).json({
        message: "Tài khoản không tồn tại.",
      });
    }
    console.log("Found user:", userExisted);

    // Nếu người dùng tồn tại, kiểm tra người dùng có nhập đúng mật khẩu không
    const passwordEncrypted = userExisted.password_encrypted;
    const isMatch = await bcrypt.compare(passwordInput, passwordEncrypted);
    if (isMatch == false) {
      return res.status(401).json({ message: "Mật khẩu không chính xác." });
    }

    const loginInfo = {
      id: userExisted.id,
      email: userExisted.email,
      employeeCode: userExisted.employee_code,
    };
    const accessToken = await generateAccessToken(loginInfo);
    const refreshToken = await generateRefreshToken(loginInfo);
    const id = uuidv4();
    // Lưu refresh token vào database.
    await pool.execute(
      "insert into refresh_token_table (id, user_id, refresh_token)" +
        " values (?, ?, ?)",
      [id, userExisted.id, refreshToken]
    );

    res.status(200).json({
      message: "Đăng nhập thành công.",
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function generateAccessToken(loginInfo) {
  return jwt.sign(loginInfo, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15min",
  });
}

async function generateRefreshToken(loginInfo) {
  return jwt.sign(loginInfo, process.env.REFRESH_TOKEN_SECRET);
}

export async function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  // kiểm tra token có hợp lệ hay không bằng secret key
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, loginInfo) => {
    if (err) return res.sendStatus(403);

    // lưu thông tin giải mã từ token vào req.loginInfo
    req.loginInfo = loginInfo;
    // gọi next() để đi tiếp vào api mà middleware đang bảo vệ
    next();
  });
}

export async function refreshToken(req, res) {
  try {
    const refreshTokenReq = req.body.token;

    if (!refreshTokenReq) return res.sendStatus(401);

    // kiểm tra refresh token có trong db không
    const [rows] = await pool.query(
      "SELECT * FROM refresh_token_table WHERE refresh_token = ?",
      [refreshTokenReq]
    );

    if (rows.length === 0) return res.sendStatus(403);

    // verify refresh token
    jwt.verify(
      refreshTokenReq,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, loginInfo) => {
        if (err) {
          console.log("Lỗi");
          return res.sendStatus(403);
        }

        // tạo access token mới
        const newAccessToken = await generateAccessToken({
          id: loginInfo.id,
          email: loginInfo.email,
          employeeCode: loginInfo.employee_code,
        });
        console.log(loginInfo);
        console.log("Không lỗi");
        return res.json({ accessToken: newAccessToken });
      }
    );
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export async function logout(req, res) {
  try {
    await pool.query("DELETE FROM refresh_token_table");
    // Gửi response về lập tức, không cần gửi message gì
    return res.sendStatus(204);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}
