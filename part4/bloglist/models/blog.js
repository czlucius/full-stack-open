const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number,
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
})

blogSchema.set("toJSON",  {
    transform: (doc, rto) => {
        rto.id = rto._id.toString()
        delete rto._id
        delete rto.__v
    }
})

module.exports =  mongoose.model('Blog', blogSchema)
console.log("modelled")
