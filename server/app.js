import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import dotenv from "dotenv"
import userRouter from "./routers/userRouter.js"
import archiveRouter from "./routers/archiveRouter.js"
import session from "express-session"
import http from "http"
import { Server } from "socket.io"

dotenv.config()

const app = express()

app.use(express.json())


import FileStore from 'session-file-store';
/*
const FileStoreOptions = {
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
    store: new (FileStore(session))()
}*/

/*const sessionMiddleware = session(FileStoreOptions)*/


const sessionMiddleware = session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false }
})

app.use(sessionMiddleware)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors({
    credentials: true,
    origin: true
}))

app.use(userRouter)
app.use(archiveRouter)

//const PORT = process.env.PORT || 8080
//const server = app.listen(PORT, () => console.log("Server is running on port", server.address().port))

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["*"],
        //credentials: true
    }
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

io.on("connection", (socket) => {
    console.log("Client connected to us")

    if (socket.request.session.userId) {
        console.log("Welcome", socket.request.session.userId);
    }

    socket.on("message", (data) => {
        console.log("Client sent a message, let's reply")
        //data.username = socket.request.session.username;
        io.emit("response", socket.request.session);
    });
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log("Server is running in port", PORT));
