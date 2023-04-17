const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require("../models/blog");

const api = supertest(app)


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
    api.post("/api/blogs")
        .send({
            title: "Test 1 ",
            author: "czlucius",
            url: "www2:858.d2:248832",
            likes: 3
          })
        .expect(200)
        .expect(res => {
            expect(res.body).toBe({
                title: "Test 1 ",
                author: "czlucius",
                url: "www2:858.d2:248832",
                likes: 3
              })
        })

}, 100000)

beforeEach(async () => {
    console.log("db url", Blog.db.host)
    await Blog.deleteMany({})
}, 100000)