import {Router} from "express"
import nodemailer from "nodemailer"
import db from "../databases/connection.js"
import transporter from "../nodemailer/nodemailer.js"
import bcrypt from "bcrypt"

const router = Router()

router.get("/isloggedin", (req, res) => {
    if (req.session.isAuth) {
        res.status(200).send({userId: req.session.userId})
    } else {
        res.status(403).send({})
    }
})

router.post("/signup", async (req, res) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    let result
    try {
        result = await db.run(
            "INSERT INTO users (name, password, email) VALUES (?, ?, ?)",
            [req.body.username, hashedPassword, req.body.email],
        )
    } catch (err) {
        res.sendStatus(400)
        return err
    }
    const userId = result.lastID

    //send mail with defined transport object
    let info = await transporter.sendMail({
        from: "\"RNN music\" <rnn_music@example.com>", // sender address
        to: req.body.email, // list of receivers
        subject: "Welcome to RNN Music.", // Subject line
        text: "Thank you for signing up for RNN Music. We hope you enjoy our application and take the opportunity to explore how music and machine learning can work together. " +
            "Enjoy yourself, and may the music be with you.", // plain text body
        html: "<b>Thank you for signing up for RNN Music.</b><br>We hope you enjoy our application and take the opportunity to explore how music and machine learning can work together." +
            "<br>Enjoy yourself, and <i>may the music be with you.</i>", // html body
    })
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))

    // User's session is now logged in
    req.session.isAuth = true
    req.session.userId = userId
    req.session.save()
    res.send({status: 200, name: req.body.username})
})

router.post("/login", async (req, res) => {
    const userObject = await db.all("SELECT id, password FROM users WHERE name = ?", req.body.username)

    if (userObject.length === 0) {
        res.sendStatus(403)
        return
    }

    const hashedPassword = userObject[0].password
    const userId = userObject[0].id

    const isSame = await bcrypt.compare(req.body.password, hashedPassword)

    if (isSame) {
        req.session.isAuth = true
        req.session.userId = userObject[0].id // Store user_id in the session

        req.session.save(err => {
            if (err) {
                res.status(500).send({message: "Internal server error"})
            } else {
                res.status(200).send({userId: userId})
            }
        })

    } else {
        req.session.isAuth = false
        req.session.save()
        res.status(403).send({})
    }
})

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.send({data: "user logged out"})
    })
})

export default router