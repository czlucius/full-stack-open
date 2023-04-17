const logger = require("../utils/logger");
const Blog = require("../models/blog");

const blogsRouter = require("express").Router()


blogsRouter.get('/', async (request, response) => {
    response.status(200).json(await Blog
        .find({})
        )
})

blogsRouter.post('/', (request, response) => {
    logger.info(JSON.stringify(request.body))
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
})

module.exports = blogsRouter