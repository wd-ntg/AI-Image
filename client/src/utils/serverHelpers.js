const server_URL = "http://localhost:8080";

export const makePostRequest = async (router, body) => {
  const response = await fetch(server_URL + router, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};

export const makeGetRequest = async (router, body) => {
  const response = await fetch(server_URL + router, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const formattedResponse = await response.json();
  return formattedResponse;
};
