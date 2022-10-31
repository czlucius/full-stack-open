require("dotenv").config()
const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.connect(url)
    .then((result) => {
        console.log("Connected to MongoDB")
    }).catch(err => {
        console.log("Error connecting to MongoDB", err)
    })


const personSchema = new mongoose.Schema({
    id: String,
    name: String,
    number: String // We need to be able to accommodate country codes, brackets, dashes, etc.
})

personSchema.set("toJSON", {
    transform: (doc, rto) => {
        // rto._id = rto._id.toString()
        // rto.id = rto._id.toString()
        delete rto.__v
    }
})

const Person = mongoose.model("Person", personSchema)

module.exports = Person