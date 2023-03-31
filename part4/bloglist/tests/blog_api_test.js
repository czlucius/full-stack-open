const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog");

const api = supertest(app)
let Blog = mongoose.model('Blog', blogSchema)


test("blog list app returns correct amount of posts", async () => {
    await api.get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
        .expect
})

beforeEach(async () => {
    await Blog.deleteMany()
})