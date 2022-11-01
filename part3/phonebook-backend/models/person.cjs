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
    name: {
        type: String, minLength: 3, required: true, unique: true
    },
    number: {
        type: String,
        minLength: 8
        , validate: {
            validator: function (v) {
                return /^\d{2}\d*-?\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!`
        }
    } // We need to be able to accommodate country codes, brackets, dashes, etc.

})

personSchema.set("toJSON", {
    transform: (doc, rto) => {
        // rto._id = rto._id.toString()
        rto.id_as_string = rto._id.toString()
        delete rto.__v
    }
})

const Person = mongoose.model("Person", personSchema)

module.exports = Person