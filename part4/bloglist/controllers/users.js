const logger = require("../utils/logger");
const User = require("../models/user")
const bcrypt = require("bcrypt")
const userRouter = require("express").Router()

userRouter.post("/api/users", async (req, res) => {
    const body = req.body
    const {username, password, name} = body
    if (!username || !password || !name) {
        res.status(400).json({error:"Invalid input, must have username, password and name."})
    }
    const passwordHash = await bcrypt.hash(password, 10)
    
    const user = new User({
        username,
        name,
        passwordHash
    })
    const result = await user.save()
    console.log("User saved:", result)
    res.status(201).json(result)
})