const express = require("express")
const morgan = require("morgan")

const app = express()
const cors = require('cors')
app.use(express.json())
app.use(cors())
app.use(express.static('build'))

function isObjEmpty(obj) {
    for (const i in obj) return false;
    return true;
}



// app.use(morgan("tiny"))
morgan.token('body', function (req, res) {
    // console.log(res)
    return req ? JSON.stringify(req.body) : null
})
app.use(morgan(":method :url :status :res[content-length] - :response-time ms :body"))

let data = require("./data.json")

app.get("/api/persons", (req, res) => {
    res.json(data)
})
app.get("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    // console.log(id)
    // console.log(data)
    const person = data.find(p => {
        // console.log(p.id)
        return p.id === id
    })
    // console.log(person)
    if (!person) {
        // Terminate prematurely
        res.status(404).send("404 Not found")
        return
    }
    const html = `<!DOCTYPE html>
<html lang="en">
	<body>
		<div>
		    Name: ${person.name}
		    <br>
		    Number: ${person.number}
        </div>
    </body>
</html>`
    res.send(html)
})

app.delete("/api/persons/:id", (req, res) => {
    const id = Number(req.params.id)
    console.log(id)
    console.log(data)
    const person = data.find(p => {
        console.log(p.id)
        return p.id === id
    })
    console.log(person)
    if (!person) {
        // Terminate prematurely
        res.status(404).send("404 Not found")
        return
    }


    data = data.filter(p => p.id !== id)
    res.send(`Deleted entry at ${id}`)
})
app.get("/info", (req, res) => {
    const noPpl = data.length
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

app.post("/api/persons", (req, res) => {
    const received = req.body
    if (!received.name || !received.number) {
        res.status(400).json({error: "Name/number missing"})
        return
    } else if (data.find(p => p.name === received.name)) {
        res.status(400).json({error: "Name must be unique"})
        return
    }
    let newId
    do {
        newId = Math.floor(Math.random() * 100000)
    } while (data.find(p => p.id === newId))
    console.log(req.body)
    const person = {...req.body, id: newId} // JSON
    console.log(person)
    data = data.concat(person)
    res.json(person)
})

app.put("/api/persons/:id", (req, res) => {
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
