const request = require("supertest");
import { client } from "../db/connection";
import { seed } from "../db/seeds/seed-test";
import app from "../server";
import Endpoints from "../Endpoints";

/*
beforeAll(() => {
  seed()
});
*/

describe("login", () => {
  test("valid login should return 200 and username for valid username and password", () => {
    return request(app)
      .post(Endpoints.login)
      .send({ username: "test1", password: "password1" })
      .expect(200)
      .then(({ body }: any) => {
        expect(body.login_response.username).toBe("test1");
        expect(body.login_response.outcome).toBe("valid");
      });
  });

  test("valid user name and invalid password return invalid password object", () => {
    return request(app)
      .post(Endpoints.login)
      .send({ username: "test1", password: "invalid" })
      .expect(400)
      .then(({ body }: any) => {
        expect(body.login_response.username).toBe("test1");
        expect(body.login_response.outcome).toBe("invalid password");
      });
  });

  test("invalid user returns 404 and invalid", () => {
    return request(app)
      .post(Endpoints.login)
      .send({ username: "invalid", password: "invalid" })
      .expect(404)
      .then(({ body }: any) => {
        expect(body.login_response.outcome).toBe("user not found");
      });
  });
});

describe("registration", () => {
  // valid -> returns username and success message
  test("returns appropriate res body and status 201 if login successful", () => {
    return request(app)
      .post(Endpoints.register)
      .send({ username: "hiroji", password: "12345" })
      .expect(201)
      .then(({ body }: any) => {
        expect(body.registration_response).toEqual({
          username: "hiroji",
          msg: "Registation successful.",
        });
      });
  });
  // password OR username exists
  test("returns appropriate res body and status 400 if login unsuccessful due to same username", () => {
    return request(app)
      .post(Endpoints.register)
      .send({ username: "test1", password: "newPassword" })
      .expect(400)
      .then(({ body }: any) => {
        expect(body).toEqual({
          username: "test1",
          msg: "400-duplicate username",
          status: 400
        });
      });
  });
});

afterAll(() => {
  client.close();
});

//hashing
//any data types
