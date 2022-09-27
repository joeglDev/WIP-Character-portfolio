const request = require("supertest");
import {seed} from "../db/seeds/seed-test";
import app from "../server";


beforeEach(() => {
  seed;
});



describe("login", () => {
  test("valid login should return 200 and username for valid username and password", () => {
    return request(app)
      .post("/login")
      .send({ username: "test1", password: "password" })
      .expect(200)
      .then(({body}:any) => {
        expect(body.login_response.username).toBe("test1");
        expect(body.login_response.outcome).toBe("valid");
      });
  });
  
  test("valid user name and invalid password return invalid password object", () => {
    return request(app)
      .post("/login")
      .send({ username: "test1", password: "invalid" })
      .expect(400)
      .then(({body}:any) => {
        expect(body.login_response.username).toBe("test1");
        expect(body.login_response.outcome).toBe("invalid password");
      });
  });

  test("invalid user returns 404 and invalid", () => {
    return request(app)
      .post("/login")
      .send({ username: "invalid", password: "invalid" })
      .expect(404)
      .then(({body}:any) => {
        expect(body.login_response.outcome).toBe("user not found");
      });
  });
});


//refactor gets db from connection file
//salting

