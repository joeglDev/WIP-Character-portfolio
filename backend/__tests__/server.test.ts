//test user login
//fail: {"username": "invalid", "password": "notPassword"}
//pass: {"username": "test1", "password": "password"}



const request = require("supertest");
import app from "../server";

describe("login", () => {
    test("invalid login should return 404 and err body", () => {
        return request(app).get("/login").expect(404)
    });
})