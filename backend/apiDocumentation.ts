export const apiData = [
  {
    ENDPOINT: "GET /",
    REQUEST: null,
    RESPONSE: [
      { ENDPOINT: "STRING", REQUEST: "NULL OR OBJECT", RESPONSE: "OBJECT" },
    ],
  },
  {
    ENDPOINT: "POST /login",
    REQUEST: { username: "STRING", password: "STRING" },
    RESPONSE: { login_response: { username: "STRING", outcome: "STRING" } },
  },
  {
    ENDPOINT: "POST /register",
    REQUEST: { username: "STRING", password: "STRING" },
    RESPONSE: { registration_response: { username: "STRING", msg: "STRING" } },
  },
  {
    ENDPOINT: "GET /characters",
    REQUEST: null,
    RESPONSE: {
      characters: [
        {
          _id: "MONGODB OBJECT(ID)",
          ownerUsername: "STRING",
          name: "STRING",
          age: "STRING",
          species: "STRING",
          gender: "STRING",
          sexuality: "STRING",
          allignment: "STRING",
          height: "STRING",
          weight: "STRING",
          imgURL: "STRING",
          bio: "STRING",
        },
      ],
    },
  },
  {
    ENDPOINT: "GET /characters/:username",
    REQUEST: null,
    RESPONSE: {
      user_characters: [
        {
          _id: "MONGODB OBJECT(ID)",
          ownerUsername: "STRING",
          name: "STRING",
          age: "STRING",
          species: "STRING",
          gender: "STRING",
          sexuality: "STRING",
          allignment: "STRING",
          height: "STRING",
          weight: "STRING",
          imgURL: "STRING",
          bio: "STRING",
        },
      ],
    },
  },
  {
    ENDPOINT: "POST /characters/:username",
    REQUEST: {
      new_character: {
        ownerUsername: "STRING",
        name: "STRING",
        age: "STRING",
        species: "STRING",
        gender: "STRING",
        sexuality: "STRING",
        allignment: "STRING",
        height: "STRING",
        weight: "STRING",
        imgURL: "STRING",
        bio: "STRING",
      },
    },
    RESPONSE: {
      character_created: {
        _id: "MONGODB OBJECT(ID)",
        ownerUsername: "STRING",
        name: "STRING",
        age: "STRING",
        species: "STRING",
        gender: "STRING",
        sexuality: "STRING",
        allignment: "STRING",
        height: "STRING",
        weight: "STRING",
        imgURL: "STRING",
        bio: "STRING",
      },
    },
  },
  {
    ENDPOINT: "DELETE /characters/:username/:id",
    REQUEST: null,
    RESPONSE: {
      character_deleted: {
        _id: "MONGODB OBJECT(ID)",
        ownerUsername: "STRING",
        name: "STRING",
        age: "STRING",
        species: "STRING",
        gender: "STRING",
        sexuality: "STRING",
        allignment: "STRING",
        height: "STRING",
        weight: "STRING",
        imgURL: "STRING",
        bio: "STRING",
      },
    },
  },
  {
    ENDPOINT: "PATCH /characters/:username/:id",
    REQUEST: {
      ownerUsername: "STRING",
      name: "STRING",
      age: "STRING",
      species: "STRING",
      gender: "STRING",
      sexuality: "STRING",
      allignment: "STRING",
      height: "STRING",
      weight: "STRING",
      imgURL: "STRING",
      bio: "STRING",
    },
    RESPONSE: {
      updated_character: {
        _id: "MONGODB OBJECT(ID)",
        ownerUsername: "STRING",
        name: "STRING",
        age: "STRING",
        species: "STRING",
        gender: "STRING",
        sexuality: "STRING",
        allignment: "STRING",
        height: "STRING",
        weight: "STRING",
        imgURL: "STRING",
        bio: "STRING",
      },
    },
  },
];
