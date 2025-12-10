import express from 'express'
import userRoutes from './src/routes/userRoutes.js'
import authRoutes from './src/routes/authRoutes.js'

const app = express()
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/users', userRoutes)
app.use('/api/auth', authRoutes)

app.listen(3000, () => {
    console.log("Server is running on port 3000")
})