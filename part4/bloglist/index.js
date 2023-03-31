import logger from "./utils/logger";
const app = require("./app")
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')

const {blogsRouter} = require("./controllers/blogs")

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = config.MONGODB_URI
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.use("/api/notes", blogsRouter)


const PORT = 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})

