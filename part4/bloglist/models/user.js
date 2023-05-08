const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min: [3, "Username must be at least 3 characters long."]
    },
    name: {type: String, required: true},
    passwordHash: {type: String, required: true},
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: "Blog"
    }]
})

userSchema.set("toJSON", {
    transform: (doc, rto) => {
        rto.id = rto._id.toString()
        delete rto._id
        delete rto.__v
        delete rto.passwordHash // We do not want the password hash to be exposed
    }
})

module.exports = mongoose.model("User", userSchema)
