const logger = require("../utils/logger");
const Blog = require("../models/blog");

const blogsRouter = require("express").Router()


blogsRouter.get('/', async (request, response) => {
    response.status(200).json(await Blog
        .find({})
        )
})

blogsRouter.post('/', (request, response) => {
    let body = request.body
    logger.info(body)

    if (!body.hasOwnProperty("likes")) {
        body = {...body, likes: 0}
    } 
    if (!body.hasOwnProperty("title") || !body.hasOwnProperty("url")) {
        console.log("error! no title or url")
        response.send(400)
        return
    }
    const blog = new Blog(body)

    blog
        .save()
        .then(result => {
            console.log("Result for creation POST", JSON.stringify(result))
            response.status(201).json(result)
        })
})

module.exports = blogsRouter