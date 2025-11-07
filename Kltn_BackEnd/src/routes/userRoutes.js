import express from "express"
import { getUsers, createUser } from "../controller/userController.js"

const router = express.Router()

router.get("/", getUsers)
router.post("/", createUser)

export default router