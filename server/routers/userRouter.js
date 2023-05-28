import { Router } from "express"
import nodemailer from "nodemailer"
import db from "../databases/connection.js"
import transporter from "../nodemailer/nodemailer.js"
import bcrypt from "bcrypt"

const router = Router()


router.post("/signup", async (req, res) => {
    const saltRounds = 10
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)

    let result;
    try {
        result =  await db.run(
            "INSERT INTO users (name, password, email) VALUES (?, ?, ?)",
            [req.body.username, hashedPassword, req.body.email],
        )
    } catch (err) {
        console.log(err)
        res.sendStatus(400)
        return err
    }
    const userId = result.lastID;

    //send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"RNN music" <rnn_music@example.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Welcome to RNN Music.", // Subject line
        text: "Thank you for signing up for RNN Music. We hope you enjoy our application and take the opportunity to explore how music and machine learning can work together. " +
            "Enjoy yourself, and may the music be with you.", // plain text body
        html: "<b>Thank you for signing up for RNN Music.</b><br>We hope you enjoy our application and take the opportunity to explore how music and machine learning can work together." +
            "<br>Enjoy yourself, and <i>may the music be with you.</i>", // html body
    })
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info))

    // User's session is now logged in
    req.session.isAuth = true
    req.session.userId = userId
    req.session.save()
    //res.send({ name: req.body.username })
    res.send({ status: 200, name: req.body.username})
})



router.post("/login", async (req, res) => {
    //const data = await db.all("SELECT password FROM users WHERE name = ?", req.body.username)
    const data = await db.all("SELECT id, password FROM users WHERE name = ?", req.body.username)

    if (data.length === 0) {
        console.log("no user found with that username")
        res.sendStatus(403)
        return
    }

    const hashedPassword = data[0].password
    const userId = data[0].id;

    const isSame = await bcrypt.compare(req.body.password, hashedPassword)

    if (isSame) {
        req.session.isAuth = true
        req.session.userId = data[0].id // Store user id in the session
        //req.session.save()
        //res.status(200).send({ userId: userId })

        req.session.save(err => {
            if (err) {
                // Handle error
                console.log(err);
                res.status(500).send({message: 'Internal server error'});
            } else {
                res.status(200).send({ userId: userId });
                console.log("success");
            }
        });
        console.log("success")

    } else {
        console.log("login failure")
        req.session.isAuth = false
        req.session.save()
        res.status(403).send({})
    }
})

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        res.send({ data: "user logged out" })
    })
})

router.get("/isloggedin", (req, res) => {
    if (req.session.isAuth) {
        res.status(200).send({ userId: req.session.userId })
    } else {
        res.status(403).send({})
    }
})

export default router