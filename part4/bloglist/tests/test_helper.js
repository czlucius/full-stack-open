const Blog = require("../models/blog")

const initialBlogs = require("./blogs.json")

async function blogsInDb() {
    const blogs = await Blog.find({})  
    return blogs.map(blog => blog.toJSON()) // We are using the toJSON method so the _id and other fields won't be there.
}

const nonExistingId = async () => {
    const blog = new Blog({ content: 'willremovethissoon' })
    await blog.save()
    await blog.deleteOne()
  
    return blog._id.toString()
}

module.exports = {
    initialBlogs, blogsInDb, nonExistingId
}