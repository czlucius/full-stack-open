const listHelper = require("../utils/list_helper");
const app = require("../app");
const supertest = require("supertest");
const crypto = require("crypto")
// const blogs = require("./users.json");
const api = supertest(app)
describe('creation with invalid parameters', () => {
    test('username < 3 chars', async () => {
        const user = {
            username: "ab",
            name: "AB 123",
            password: "applebanana"
        }

        const result = await api.post("/api/users")
            .send(user)
            // .expect(400)
        console.log("/api/users post result, username < 3", result)
        expect(result).toHaveProperty("error")

    }, 5000)

    test('password < 3 chars', async () => {
        const user = {
            username: "134198",
            name: "User 134198",
            password: "21"
        }

        const result = await api.post("/api/users")
            .send(user)
            .expect(400)
        expect(result).toHaveProperty("error")

    }, 5000)

    test('non unique username', async () => {
        const user = {
            username: crypto.randomUUID(),
            name: crypto.randomUUID(),
            password: "248r92f2ih2"
        }

        const result1 = await api.post("/api/users")
            .send(user)
            .expect([200, 201])

        const result2 = await api.post("/api/users")
            .send(user)
            .expect(400)
        expect(result2).toHaveProperty("error")

    }, 5000)
})
