const mongoose = require("mongoose")

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>>')
  process.exit(1)
}

const pw = process.argv[2]
const url = `mongodb+srv://czlucius:${pw}@cluster0.3zshi9a.mongodb.net/phonebookApp?retryWrites=true&w=majority`

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})
const Contact = mongoose.model('Contact', contactSchema)
mongoose.connect(url)
    .then(result => {
    if (process.argv.length === 3) {
    // displaying
    console.log("phonebook:")
    Contact.find({})
        .then(contacts => {
        for (const c of contacts) {
            console.log(c.name, c.number)
        }
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    // adding
    const name = process.argv[3]
    const number = process.argv[4]
    
    const contact = new Contact({name, number})
    contact.save().then(result => {
        console.log("added", name, "number", number, "to phonebook")
        mongoose.connection.close()
    })
}

}).catch(err=>console.log(err))
