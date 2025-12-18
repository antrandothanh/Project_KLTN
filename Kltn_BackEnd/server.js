import express from 'express';
import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import departmentRoutes from "./src/routes/departmentRoutes.js";
import cors from "cors";

const app = express();
app.use(express.json());

// CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use("/api/departments", departmentRoutes)


app.listen(3000, () => {
    console.log("Server is running on port 3000");
});