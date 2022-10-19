export const loginModel = async (username: string, password: string) => {
  console.log("attempting api call");
  const rawResponse = await fetch("http://localhost:9124/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: username, password: password }),
  });
  const content = await rawResponse.json();
  return content
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
  const content = await rawResponse.json();
  return content
};