import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routers/userRouter.js"
import archiveRouter from "./routers/archiveRouter.js"
import session from "express-session"
import http from "http"
import {Server} from "socket.io"

dotenv.config()

const app = express()

app.use(express.json())

const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {secure: false},
})

app.use(sessionMiddleware)

app.use(bodyParser.urlencoded({extended: true}))
app.use(cors({
    credentials: true,
    origin: true,
}))

app.use(userRouter)
app.use(archiveRouter)

const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["*"],
    },
})

/*const wrap = middleware => (socket, next) => middleware(socket.request, {}, next)
io.use(wrap(sessionMiddleware))*/

io.on("connection", (socket) => {
    socket.on("newMelodyMessage", (data) => {
        // Send to everyone except the sender.
        socket.broadcast.emit("newMelodyMessage", data)

    })
})

const PORT = process.env.PORT || 8080
server.listen(PORT, () => console.log("Server is running in port", PORT))
