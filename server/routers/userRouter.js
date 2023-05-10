import { Router } from "express"
import nodemailer from "nodemailer"
import db from "../databases/connection.js"
import transporter from "../nodemailer/nodemailer.js"
import bcrypt from "bcrypt"

const router = Router()

router.post("/signup", async (req, res) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    try {
        await db.run(
            "INSERT INTO users (name, password, email) VALUES (?, ?, ?)",
            [req.body.username, hashedPassword, req.body.email],
        )
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
        return err
    }

   //TODO: ændre teksten 
    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Fino Dino 🦖" <fino_dino@example.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Hello 🦖 🦕 ", // Subject line
        text: "Thank you for signing up for Fino Dino. You are now ready to vote for your favorite dinosaur. Fino Dino will regularly rotate the dinosaurs so that you can choose from new dinosaurs.", // plain text body
        html: "<b>Thank you for signing up for Fino Dino.</b><br>You are now ready to vote for your favorite dinosaur.<br>Fino Dino will regularly rotate the dinosaurs so that you can choose from new dinosaurs.", // html body
    })
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

    // User's session is now logged in
    req.session.isAuth = true
    req.session.save()
    res.send({ name: req.body.username })
})

router.post("/login", async (req, res) => {
    const data = await db.all("SELECT password FROM users WHERE name = ?", req.body.username)

    if (data.length === 0) {
        console.log("no user found with that username")
        res.sendStatus(403)
        return
    }

    const hashedPassword = data[0].password

    const isSame = await bcrypt.compare(req.body.password, hashedPassword)

    if (isSame) {
        console.log("success")
        req.session.isAuth = true
        req.session.save()
        res.sendStatus(200)
    } else {
        console.log("login failure")
        req.session.isAuth = false
        req.session.save()
        res.sendStatus(403)
    }
})

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.send({ data: "user logged out" })
    })
})

router.get("/isloggedin", (req, res) => {
    if (req.session.isAuth) {
        res.sendStatus(200)
    } else {
        res.sendStatus(403)
    }
})

export default router