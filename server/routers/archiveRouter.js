import { Router } from "express"
import db from "../databases/connection.js"

const router = Router()

router.get("/archive", async (req, res) => {
    if (req.session.isAuth) {
        const userId = req.session.userId;
        const data = await db.all("SELECT id, timestamp, array as melody FROM archive WHERE user_id = ?", userId)
        res.send(data).status(200)
    } else {
        res.sendStatus(403)
    }
})

router.post("/archive", async (req, res) => {
    if (req.session.isAuth) {
        const userId = req.session.userId;
        const item = req.body;
        console.log(item.melody)
        await db.run(
            "INSERT INTO archive (user_id, timestamp, array) VALUES (?, ?, ?)",
            [userId, item.timestamp, JSON.stringify(item.melody)],
        )
        res.sendStatus(200)
    } else {
        res.sendStatus(403)
    }
})
router.delete("/archive/:id", async (req, res) => {
    if (req.session.isAuth) {
        const userId = req.session.userId;
        const melodyId = req.params.id;

        const sql = `DELETE FROM archive WHERE id = ? AND user_id = ?`;

        const stmt = await db.prepare(sql);

        try {
            await stmt.run(melodyId, userId);
            res.sendStatus(200);
        } catch (error) {
            console.error(`Failed to delete melody with id ${melodyId}:`, error);
            res.sendStatus(500);
        } finally {
            await stmt.finalize();
        }
    } else {
        res.sendStatus(403);
    }
});



export default router