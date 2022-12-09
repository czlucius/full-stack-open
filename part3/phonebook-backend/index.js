const express = require("express")
const morgan = require("morgan")
const Person = require("./models/person.cjs")

const app = express()
const cors = require("cors")
app.use(express.json())
app.use(cors())
app.use(express.static("build"))



function isObjEmpty(obj) {
    for (const i in obj) return false
    return true
}


morgan.token("body", function (req) {
    // console.log(res)
    return req ? JSON.stringify(req.body) : null
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))



let data = require("./data.json.old")
const mongoose = require("mongoose")
// OK
app.get("/api/persons", async (req, res) => {
    const persons = await Person.find({})
    console.log(persons)
    res.json(persons)
})
// OK
app.get("/api/persons/:id", async (req, res, next) => {
    const id = req.params.id
    console.log(id)
    let person
    try {
        person = await Person.findById(id)
    } catch (err) {
        next(err)
        return
    }

    // console.log("people", people)
    if (!person || isObjEmpty(person)) {
        // Terminate prematurely
        res.status(204).send("204 No Content")
        return

    } else {
        console.log(person)
        res.json(person)
    }


})
// OK
app.delete("/api/persons/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)
    console.log(data)

    const success = await Person.findByIdAndDelete(id)

    if (success) {
        res.send(`Deleted entry at ${id}`)
    } else {// Terminate prematurely
        res.status(404).send("404 Not found")

    }
})
// OK
app.get("/info", async (req, res) => {
    let noPpl
    try {
        noPpl = (await Person.find({})).length
    } catch (err) {
        console.log("An error occurred:", err)
        res.status(500).end()
        return
    }
    const dateString = new Date().toString()

    const html = `<!DOCTYPE html>
<html lang="en">
	<body>
		<div>
		    Phonebook has info for ${noPpl} people
		</div>
		<br>
		<div>
		    ${dateString}
        </div>
	</body>
</html>`
    res.send(html)
})

//OK
app.post("/api/persons", async (req, res, next) => {
    const received = req.body
    if (!received.name || !received.number) {
        res.status(400).json({ error: "Name/number missing" })
        return
    }
    // else if (data.find(p => p.name === received.name)) {
    //     res.status(400).json({error: "Name must be unique"})
    //     return
    // }
    console.log(req.body)
    const person = new Person(req.body) // JSON
    console.log(person._id)
    person.id = person._id.toString()
    console.log(person)
    let personSaved
    try {
        personSaved = await person.save()
    } catch (err) {
        next(err)
        return
    }
    res.json(personSaved)
})

app.put("/api/persons/:id", async (req, res) => {

    const id = req.params.id
    console.log("put", id)
    const received = req.body
    if (!received.name || !received.number) {
        res.status(400).json({ error: "Name/number missing" })
        return
    } else if (!Person.findById(id)) { // not inside
        const person = new Person(req.body) // JSON
        console.log(person._id)
        person.id = person._id.toString()
        console.log(person)
        await person.save()
        res.json(person)
    } else { // inside
        // const person = new Person(req.body) // JSON
        console.log(await Person.updateOne({ _id: new mongoose.Types.ObjectId(id) }, req.body, { new: true, runValidators: true, context: "query" }))
        res.json(req.body)
    }
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: "unknown endpoint" })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === "CastError") {
        return response.status(400).send({ error: "malformatted id" })
    } else if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)
const PORT = 18398
app.listen(PORT, () => console.log(`App is running on ${PORT}`))
