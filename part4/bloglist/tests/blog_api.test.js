const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog");

const api = supertest(app)
const initLength = 0


test("blog list app returns correct amount of posts", async () => {
    await api.get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/)
}, 100000)

test("unique identifier is named id, and matches _id", async () => {
    // /*
    // schema:
    //     title: String,
    // author: String,
    // url: String,
    // likes: Number
    // */
    // const newBlog = new Blog({
    //     title: "Test",
    //     author: "Test Author",
    //     url: "https://test.test",
    //     likes: 3
    // })
    // newBlog.save((err) => {
    //     if (err) return
    // })

    const resp = await api.get("/api/blogs")
        .expect(200)
    console.log(`Response is ${JSON.stringify(resp)}`)
    // resp.expect(200)

    const ids = resp.body.map(item => item.id)
    const _ids = resp.body.map(item => item.id)


    for (let i = 0; i < resp.length; i++) {
        expect(ids[i]).toBeDefined()
        expect(_ids[i].toString()).toBe(ids[i])
    }

    
}, 100000)

test("POST to /api/blogs creates a new post", async () => {
    const payload = {
        title: "Test 1 ",
        author: "czlucius",
        url: "www2:858.d2:248832",
        likes: 3
    };
    await api.post("/api/blogs")
        .send(payload)
        .expect([200, 201])
    expect(await Blog.find(payload)).toHaveLength(1)
    expect(await Blog.find({})).toHaveLength(initLength+1)

}, 150000)

test("request without likes sets likes to 0", async () => {
    const payload = {
        title: "Test 1 ",
        author: "czlucius",
        url: "www2:858.d2:248832"
    };
    const response = await api.post("/api/blogs")
        .send(payload)
        .expect([200, 201])
    expect(response.body).toHaveProperty("likes", 0)

})

beforeEach(async () => {
    console.log("db url", Blog.db.host)
    await Blog.deleteMany({})
}, 100000)