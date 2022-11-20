export const loginModel = async (username: string, password: string) => {
  console.log("attempting api call");
  const rawResponse = await fetch("http://localhost:9124/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  const response = await rawResponse.json();
  return response;
};

export const registrationModel = async (username: string, password: string) => {
  console.log("attempting api call");
  const rawResponse = await fetch("http://localhost:9124/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  const response = await rawResponse.json();
  return response;
};

export const pullAllCharDataModel = async () => {
  const rawResponse = await fetch("http://localhost:9124/characters");
  const response = await rawResponse.json();
  return response;
};

export const pullUserCharDataModel = async (username: string) => {
  const rawResponse = await fetch(
    `http://localhost:9124/characters/${username}`
  );
  const response = await rawResponse.json();
  return response;
};

export const deleteCharacterModel = async (username: string, id: string) => {
  const rawResponse = await fetch(`http://localhost:9124/characters/${username}/${id}`, {
    method: "DELETE",
  });
  const response = await rawResponse.json();
  return response;
};

export const uploadNewCharacter = async (username: string, characterObject : any)  => {
  const rawResponse = await fetch(`http://localhost:9124/characters/${username}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(characterObject),
  });
  const response = await rawResponse.json();
  return response;
}
