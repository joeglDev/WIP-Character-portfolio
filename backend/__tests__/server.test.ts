const request = require("supertest");
import seed from "../db/seeds/seed-test";
import app from "../server";

beforeEach(() => {
  seed;
});

describe("login", () => {
  test("valid login should return 200 and username", () => {
    return request(app)
      .post("/login")
      .send({ username: "test1", password: "password" })
      .expect(200)
      .then(({body}:any) => {
        expect(body.found_user.username).toBe("test1")
      });
  });
});

