const logger = require("../utils/logger");
const User = require("../models/user")
const bcrypt = require("bcrypt")
const userRouter = require("express").Router()

userRouter.post("/", async (req, res) => {
    const body = req.body
    const {username, password, name} = body
    if (!username || !password || !name) {
        return res.status(400).json({error:"Invalid input, must have username, password and name."})
    }

    // Password validation
    const usersWithUsername = await User.find({username})
    const msg = []
    if (username.length < 3) msg.push("Username is too short (3 characters or more)")
    if (password.length < 3) msg.push("Password is too short (3 characters or more)")
    if (usersWithUsername.length > 0) msg.push("User already exists")
    if (msg.length > 0) {
        return res.status(400).json({error: msg})
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


userRouter.get("/", async (req, res) => {
    const users = (await User.find({}).populate("blogs"))
    res.status(200).json(users)
})

module.exports = userRouter
