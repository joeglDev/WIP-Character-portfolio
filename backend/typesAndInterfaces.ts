export interface charData {
  ownerUsername: string;
  name: string;
  age: string;
  species: string;
  gender: string;
  sexuality: string;
  allignment: string;
  height: string;
  weight: string;
  imgURL: string;
  bio: string;
}

export interface loginResponseObject {
  login_response: { username: string; outcome: string };
}

export interface registationResponseObject {
  registration_response: { username: string; msg: string };
}

export interface userData {
    username: string,
    password: string,
};
