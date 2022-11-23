const request = require("supertest");
import { client } from "../db/connection";
import { seed } from "../db/seeds/seed-test";
import app from "../server";
import Endpoints from "../Endpoints";
import { apiData } from "../apiDocumentation";

/*
beforeAll(() => {
  seed()
});
*/

describe("login", () => {
  test("200- login sucessful", () => {
    return request(app)
      .post(Endpoints.login)
      .send({ username: "test1", password: "password1" })
      .expect(200)
      .then(({ body }: any) => {
        expect(body.login_response.username).toBe("test1");
        expect(body.login_response.outcome).toBe("valid");
      });
  });

  test("400- invalid password", () => {
    return request(app)
      .post(Endpoints.login)
      .send({ username: "test1", password: "invalid" })
      .expect(400)
      .then(({ body }: any) => {
        expect(body.login_response.username).toBe("test1");
        expect(body.login_response.outcome).toBe("invalid password");
      });
  });

  test("404- invalid username and password", () => {
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
  test("201- registration successful", () => {
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
  test("400- username in use", () => {
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
  test("404- invalid API endpoint", () => {
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
  test("200- get all character data", () => {
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

  test("200- get a users characters by username", () => {
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
  test("400- empty request body", () => {
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

  test("400- incorrect request body", () => {
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

  test("404- user not found", () => {
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

  test("201- post new character", () => {
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

describe("can delete an existing character", () => {
  test("200- character deleted and returned", () => {
    const testBody = {
      new_character: {
        ownerUsername: "test1",
        name: "char_test_2",
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
      .then(({ body }: any) => {
        const charToDelete = body.character_created._id;
        return request(app)
          .delete(`/characters/test1/${charToDelete}`)
          .expect(200)
          .then(({ body }: any) => {
            expect(body.deleted_character).toEqual(
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

  //char not found
  test("404- character id not found", () => {
    return request(app)
      .delete("/characters/test1/637165bb10bc4fdd2137ec8b")
      .expect(404)
      .then(({ body }: any) => {
        expect(body.invalid_character).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            msg: expect.any(String),
            status: expect.any(Number),
          })
        );
      });
  });
});

describe("update existing character", () => {
  let id: string;
  const updateBody = {
    ownerUsername: "test1",
    name: "test2",
    age: "test3",
    species: "test4",
    gender: "test5",
    sexuality: "test6",
    allignment: "test7",
    height: "test8",
    weight: "test9",
    imgURL: "test10",
    bio: "test11",
  };
  //CAN UPDATE char
  test("200- updated character", () => {
    //get a in use id for use in request

    return request(app)
      .get("/characters/test1")
      .then(({ body }: any) => {
        id = body.user_characters[0]._id;
        expect(typeof id).toBe("string");
        return request(app)
          .patch(`/characters/test1/${id}`)
          .send(updateBody)
          .expect(200)
          .then(({ body }: any) => {
            expect(body.updated_character).toEqual(
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
  test("404 - character id not found", () => {
    return request(app)
      .patch(`/characters/test1/637165bb10bc4fdd2137ec8b`)
      .send(updateBody)
      .expect(404)
      .then(({ body }: any) => {
        expect(body.invalid_character).toEqual(
          expect.objectContaining({
            id: expect.any(String),
            msg: expect.any(String),
            status: expect.any(Number),
          })
        );
      });
  });

  test("400 - invalid request body", () => {
    return request(app)
      .patch(`/characters/test1/${id}`)
      .send({})
      .expect(400)
      .then(({ body }: any) => {
        expect(body.invalid_body).toEqual(
          expect.objectContaining({
            //id: expect.any(String),
            msg: expect.any(String),
            status: expect.any(Number),
          })
        );
      });
  });
});

describe("route", () => {
  test("200- returns API documentation", () => {
    return request(app)
      .get(Endpoints.route)
      .expect(200)
      .then(({ body }: any) => {
        expect(body.api_documentation).toEqual(apiData);
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
