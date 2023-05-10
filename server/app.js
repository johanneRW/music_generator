import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routers/userRouter.js"
import session from "express-session"

dotenv.config()

const app = express()

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    credentials: true,
    origin: true
}))

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

app.use(userRouter)

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => console.log("Server is running on port", server.address().port))


