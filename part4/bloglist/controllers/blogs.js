const logger = require("../utils/logger");
const Blog = require("../models/blog");
const blog = require("../models/blog");
const User = require("../models/user")
const jwt = require("jsonwebtoken");
const {decode} = require("jsonwebtoken");

const blogsRouter = require("express").Router()


blogsRouter.get('/', async (request, response) => {
    response.status(200).json(await Blog
        .find({}).populate("user")
    )
})



blogsRouter.post('/', async (request, response) => {
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

    if (!request.token) return response.status(401).json({error: 'no token sent'})
    //
    // let decodedToken
    // try {
    //     decodedToken = jwt.verify(token, process.env.SECRET)
    //
    // } catch (error) {
    //     return response.status(401).json({error})
    // }
    // if (!decodedToken.id) { // THIS ID IS FOR USER ID AND NOT FOR DOCUMENT ID!!!1
    //     return response.status(401).json({error: 'token invalid'})
    // }
    // const user = await User.findById(decodedToken.id)

    const user = request.user // If auth token is null what do we do? Security vuln!
    console.log("users", user)


    body.user = user._id
    const blog = new Blog(body)
    const result = await blog
        .save()
    user.blogs = user.blogs.concat(result._id)
    await user.save()


    console.log("Result for creation POST", JSON.stringify(result))
    response.status(201).json(result)
})

blogsRouter.delete('/:id', async (request, response) => {
    if (!request.token) return response.status(401).json({error: 'no token sent'})
    const user = request.user
    let id = request.params.id
    const item = await blog.findById(id)
    console.log("item found for deletion, user details", item, user, "compare", item.user, user._id)
    if (item.user.toString() !== user._id.toString()) { // Check if ID strings match T
        console.log("Token invalid")
        return response.status(401).json({error: "user not authorised"})
    }
    console.log("deletion", id)
    const deleted = await blog.findByIdAndDelete(id)  // TODO are there any more efficient approaches? We alr queried the DB, there is no need to query again to delete right?

    console.log("deleted doc", deleted)
    response.send(200)
    return
})


blogsRouter.put("/:id", async (request, response) => {
    const id = request.params.id
    const body = request.body
    if (!request.token) return response.status(401).json({error: 'no token sent'})
    const user = request.user
    console.log("blog id", id)
    const item = await blog.findById(id)
    console.log("item found for put", item)
    if (item.user.toString() !== user._id.toString()) { // Check if ID strings match
        console.log("Token invalid")
        return response.status(401).json({error: "user not authorised"})
    }
    console.log("update", id)
    const newBlog = {}
    if (body.title) newBlog["title"] = body.title
    if (body.author) newBlog["author"] = body.author
    if (body.url) newBlog["url"] = body.url
    if (body.likes) newBlog["likes"] = body.likes

    const result = await Blog.findByIdAndUpdate(id, newBlog) // findOne vs findById is so annoying... :(
    response.send(result)
})

module.exports = blogsRouter
