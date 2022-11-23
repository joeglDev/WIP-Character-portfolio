class Endpoints {
  static route: string = "/";
  static login: string = "/login";
  static register: string = "/register";
  static invalidEnd: string = "*";
  static charactersEnd: string = "/characters";
  static userCharactersEnd: string = "/characters/:username";
  static specificUserCharacterEnd: string = "/characters/:username/:id";
}

export default Endpoints;
