const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    passwordHash: String,
    blogs: [{
        type: mongoose.Types.ObjectId,
        ref: "Blog"
    }]
})

userSchema.set("toJSON", {
    transform: (doc, rto) => {
        rto.id = _rto._id.toString()
        delete rto._id
        delete rto.__v
        delete rto.passwordHash // We do not want the password hash to be exposed
    }
})

module.exports = mongoose.Model("User", userSchema)