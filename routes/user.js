const express = require('express');
const User = require('../models/Users');
const Jwt = require('jsonwebtoken');
const jwtKey = "food";
const app = express();

//create new User : api/user/register
app.post('/register', async (req, res) => {
    try {
        let newuser = new User(req.body);
        let save = await newuser.save();
        save = save.toObject()
        delete save.password

        Jwt.sign({ save }, jwtKey, (err, token) => {
            if (err) {
                return res.status(404).json({ error: "The user already exist" })
            }
            res.send({ save, auth: token })
        })
    } catch (e) {
        res.status(404).json({ error: e })
    }
});

//Sign User : api/user/login
app.post('/login', async (req, res) => {
    try {
        if (req.body.email && req.body.password) {
            let find = await User.findOne(req.body).select("-password");
            if (!find) {
                return res.status(404).json({ error: "user not found" })
            }

            Jwt.sign({ find }, jwtKey, (err, token) => {
                if (err) {
                    return res.status(404).json({ error: "user not found" })
                }
                res.send({ find, auth: token })
            })

        } else {
            return res.status(404).json({ error: "user not found" })
        }
    } catch (e) {
        res.status(404).json({ error: "Server not responding" })
    }
})


module.exports = app;