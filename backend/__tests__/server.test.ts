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
          status: 400,
        });
      });
  });
});

describe("invalid API endpoints", () => {
  test("invalid API endpoint returns http status 404 and msg", () => {
    return request(app)
      .get("/invalid")
      .expect(404)
      .then(({ body }: any) => {
        expect(body.invalid_request).toEqual({
          status: 404,
          msg: "404-invalid endpoint",
        });
      });
  });
});

describe("get char data", () => {
  test("get all char data", () => {
    return request(app)
      .get(Endpoints.charactersEnd)
      .expect(200)
      .then(({ body }: any) => {
        body.characters.forEach((char: any) => {
          expect(char).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              age: expect.any(String),
              allignment: expect.any(String),
              gender: expect.any(String),
              sexuality: expect.any(String),
              height: expect.any(String),
              weight: expect.any(String),
              imgURL: expect.any(String),
              species: expect.any(String),
              name: expect.any(String),
              ownerUsername: expect.any(String),
              bio: expect.any(String),
            })
          );
        });
      });
  });

  test("get a specific users characters by username", () => {
    return request(app)
      .get("/characters/test1")
      .expect(200)
      .then(({ body }: any) => {
        expect(body.user_characters.length).toBe(2);
        body.user_characters.forEach((char: any) => {
          expect(char).toEqual(
            expect.objectContaining({
              _id: expect.any(String),
              age: expect.any(String),
              allignment: expect.any(String),
              gender: expect.any(String),
              sexuality: expect.any(String),
              height: expect.any(String),
              weight: expect.any(String),
              imgURL: expect.any(String),
              species: expect.any(String),
              name: expect.any(String),
              ownerUsername: expect.any(String),
              bio: expect.any(String),
            })
          );
        });
      });
  });
});

describe("post a new character", () => {
  test("empty body gives 400 error", () => {
    const emptyBody = { new_character: {} };
    return request(app)
      .post("/characters/test1")
      .send(emptyBody)
      .expect(400)
      .then(({ body }: any) => {
        expect(body.invalid_body).toEqual({
          status: 400,
          username: "test1",
          msg: "400-invalid response body",
        });
      });
  });

  test("incorrect body gives 400 error", () => {
    const emptyBody = {
      new_character: {
        ownerUsername: "",
        name: "",
        age: "",
        species: "",
        gender: "",
        sexuality: "",
        allignment: "",
        height: "",
        weight: "",
        imgURL: "",
        bio: "",
      },
    };
    return request(app)
      .post("/characters/test1")
      .send(emptyBody)
      .expect(400)
      .then(({ body }: any) => {
        expect(body.invalid_body).toEqual({
          status: 400,
          username: "test1",
          msg: "400-invalid response body",
        });
      });
  });

  test("no user found err", () => {
    const testBody = {
      new_character: {
        ownerUsername: "invalid user",
        name: "char_test_1",
        age: "",
        species: "",
        gender: "",
        sexuality: "",
        allignment: "",
        height: "",
        weight: "",
        imgURL: "",
        bio: "",
      },
    };
    return request(app)
      .post("/characters/invalid user")
      .send(testBody)
      .expect(404)
      .then(({ body }: any) => {
        expect(body.invalid_user).toEqual({
          status: 404,
          username: "invalid user",
          msg: "404-user not found",
        });
      });
  });

  test("correct body gives 201 http code", () => {
    const testBody = {
      new_character: {
        ownerUsername: "test1",
        name: "char_test_1",
        age: "",
        species: "",
        gender: "",
        sexuality: "",
        allignment: "",
        height: "",
        weight: "",
        imgURL: "",
        bio: "",
      },
    };
    return request(app)
      .post("/characters/test1")
      .send(testBody)
      .expect(201)
      .then(({ body }: any) => {
        expect(body.character_created).toEqual(
          expect.objectContaining({
            _id: expect.any(String),
            age: expect.any(String),
            allignment: expect.any(String),
            gender: expect.any(String),
            sexuality: expect.any(String),
            height: expect.any(String),
            weight: expect.any(String),
            imgURL: expect.any(String),
            species: expect.any(String),
            name: expect.any(String),
            ownerUsername: expect.any(String),
            bio: expect.any(String),
          })
        );
      });
  });
});

/*
{ownerUsername: "",
    name: "",
    age: "",
    species: "",
    gender: "",
    sexuality: "",
    allignment: "",
    height: "",
    weight: "",
    imgURL: "",
    bio: ""}
*/

afterAll(() => {
  client.close();
});

//hashing
//any data types
