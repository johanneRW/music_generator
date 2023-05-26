import { Router } from "express"
import db from "../databases/connection.js"

const router = Router()

router.get("/archive", async (req, res) => {
    if (req.session.isAuth) {
        const userId = req.session.userId;
        const data = await db.all("SELECT * FROM archive WHERE userId = ?", userId)
        // Then return the data to the client...
    } else {
        res.sendStatus(403)
    }
})

router.post("/archive", async (req, res) => {
    if (req.session.isAuth) {
        const userId = req.session.userId;
        const item = req.body;
        await db.run(
            "INSERT INTO archive (userId, item) VALUES (?, ?)",
            [userId, JSON.stringify(item)],
        )
        // Then return the new item to the client...
    } else {
        res.sendStatus(403)
    }
})