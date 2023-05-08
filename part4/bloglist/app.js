const logger = require("./utils/logger")
const http = require('http')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const express = require("express")
const blogsRouter = require("./controllers/blogs")
const userRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const middleware = require("./utils/middleware")
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

app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)
// app.use(middleware.userExtractor)

app.use("/api/blogs", middleware.userExtractor, blogsRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

const PORT = 3003
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        logger.info(`Server running on port ${PORT}`)
    })
}



module.exports = app
