const express = require("express")
const app = express()

const data = require("./data.json")

app.get("/api/persons", (req,res)=>{
	res.json(data)
})
const PORT=3001
app.listen(PORT, ()=>console.log(`App is running on ${PORT}`))
