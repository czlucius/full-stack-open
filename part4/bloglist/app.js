const logger = require("./utils/logger")
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const express = require("express")
const blogsRouter = require("./controllers/blogs")
const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });



app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogsRouter)


const PORT = 3003
app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`)
})



module.exports = app