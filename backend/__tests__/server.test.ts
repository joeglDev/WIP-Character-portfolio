

const request = require("supertest");
import app from "../server";

describe("login", () => {
  test("invalid login should return 404 and err body", () => {
    return request(app)
      .post("/login")
      .send({ username: "invalid", password: "invalid" })
      .expect(404)
      .then((body: any) => {
        console.log({body});
      });
  });
});
