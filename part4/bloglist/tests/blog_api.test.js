const mongoose = require('mongoose')
const supertest = require('supertest')
const crypto = require("crypto")
const app = require('../app')
const Blog = require("../models/blog");
const helper = require("./test_helper");
const blog = require('../models/blog');
const api = supertest(app)

const username = crypto.randomUUID()
const password = "password123"
let loginToken
const getAuthHeader = () => {
    console.log("login token", loginToken)
    return {"Authorization": `Bearer ${loginToken}`}
}


describe("when there are some some notes saved", () => {
    test("blog list app returns correct amount of posts", async () => {
        await api.get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/)
    }, 100000)

    test("all blogs are returned", async () => {
        const response = await api.get("/api/blogs")
        expect(response.body).toHaveLength(helper.initialBlogs.length)
    })


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
})


describe("creation of new blog", () => {


    test("POST to /api/blogs creates a new post", async () => {
        const payload = {
            title: "Test 1 ",
            author: "czlucius",
            url: "www2:858.d2:248832",
            likes: 3
        };

        const blogs = await helper.blogsInDb()

        await api.post("/api/blogs")
            .send(payload)
            .set(getAuthHeader())
            .expect([200, 201])
        expect(await Blog.find(payload)).toHaveLength(1)
        expect(await helper.blogsInDb()).toHaveLength(blogs.length + 1) // get current length + 1

    }, 150000)

    test("request without likes sets likes to 0", async () => {
        const payload = {
            title: "Test 1 ",
            author: "czlucius",
            url: "www2:858.d2:248832"
        };
        const response = await api.post("/api/blogs")
            .send(payload)
            .set(getAuthHeader())
            .expect([200, 201])
        expect(response.body).toHaveProperty("likes", 0)

    })

    test("request without title or url responds with 400 Bad Request", async () => {
        const payload1 = {
            author: "czlucius",
            url: "www2:858.d2:248832"
        };
        await api.post("/api/blogs")
            .set(getAuthHeader())

            .send(payload1)
            .expect(400)
        const payload2 = {
            title: "",
            author: "czlucius",
        };
        await api.post("/api/blogs")
            .set(getAuthHeader())
            .send(payload2)
            .expect(400)
    }, 13000)
})


describe("deletion of blog", () => {

    test("http delete request deletes an item", async () => {
        const payload1 = {
            title: "Hello",
            author: "czlucius",
            url: "www2:858.d2:248832"
        };
        const newObj = (await api.post("/api/blogs")
            .set(getAuthHeader())

            .send(payload1)).body
        console.log("newobj", newObj)

        const blogs = await helper.blogsInDb()

        await api.delete(`/api/blogs/${newObj.id.toString()}`)
            .set(getAuthHeader())

        expect(await Blog.find({ id: newObj.id })).toHaveLength(blogs.length - 1)
        // await api.post("/api/blogs")
        //     .send(payload2)
        //     .expect(400)
    }, 13000)

})

describe("updating a blog", () => {
    test("http put updates an existing note", async () => {
        const blogs = await helper.blogsInDb()
        expect(blogs.length).toBeGreaterThan(0) // We won't want to work with undefined
        const specific = (await api.post("/api/blogs")
            .set(getAuthHeader())
            .send({
                title: "Helo",
                author: "anonymous",
                url: "ww.io"
            })).body

        const payload = {
            likes: specific.likes + 1
        }
        console.log("specific blog to update", specific)

        await api.put(`/api/blogs/${specific.id}`)
            .set(getAuthHeader()) // Since all blogs created in this test are by the same user we do not need to create another post just for PUT.

            .send(payload)
        const newBlog = await Blog.findById(specific.id)
        expect(newBlog).toHaveProperty("likes", payload.likes)
    })
})

beforeEach(async () => {
    console.log("db url", Blog.db.host)
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)

    await api.post("/api/users")
        .send({
            username, password, name: "Mr XYZ"
        })
    const response = await api.post("/api/login")
        .send({username, password})
    // console.log("Login response", response, response.body.token)
    loginToken = response.body.token
}, 100000)
