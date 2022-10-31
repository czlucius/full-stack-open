const express = require("express")
const morgan = require("morgan")
const Person = require("./models/person.cjs")

const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

function isObjEmpty(obj) {
    for (const i in obj) return false;
    return true;
}


morgan.token('body', function (req, res) {
    // console.log(res)
    return req ? JSON.stringify(req.body) : null
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

let data = require("./data.json.old")
const mongoose = require("mongoose");
// OK
app.get("/api/persons", async (req, res) => {
    const persons = await Person.find({})
    console.log(persons)
    res.json(persons)
})
//
app.get("/api/persons/:id", async (req, res) => {
    const id = req.params.id
    console.log(id)

    const person = await Person.findById(id);

    // console.log("people", people)
    if (!person || isObjEmpty(person)) {
        // Terminate prematurely
        res.status(404).send("404 Not found")

    } else {
        console.log(person)
        const html = `<!DOCTYPE html>
<html lang="en">
	<body>
		<div>
		    <h3>Name: ${person.name}</h3>
		    
		    <h4>Number: ${person.number}</h4>
        </div>
    </body>
</html>`
        res.send(html)
    }


})

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
app.get("/info", async (req, res) => {
    let noPpl
    try {
        noPpl = (await Person.find({})).length
    } catch (err) {
        console.log("An error occurredL:", err)
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
app.post("/api/persons", async (req, res) => {
    const received = req.body
    if (!received.name || !received.number) {
        res.status(400).json({error: "Name/number missing"})
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
    await person.save()
    res.json(person)
})

app.put("/api/persons/:id", async (req, res) => {
    await res.json({msg: "WIP"})
    return
    const id = Number(req.params.id)
    const received = req.body
    let person
    if (!received.name || !received.number) {
        res.status(400).json({error: "Name/number missing"})
        return
    } else if (!data.find(p => p.id === id)) {
        console.log(req.body)
        person = {...req.body, id} // JSON
        console.log(person)

        data = data.concat(person)
    } else {
        data = data.filter(p => p.id !== id)
        person = {...req.body, id}
        data = data.concat(person)
    }
    res.json(person)
})


const PORT = 18398
app.listen(PORT, () => console.log(`App is running on ${PORT}`))
