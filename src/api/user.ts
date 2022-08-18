const APIDOMAIN = process.env.REACT_APP_API_DOMAIN;

//user returns the unique userID and username
export async function getUser(id) {
  return fetch(`${APIDOMAIN}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  });
}

export async function sendCreateUserRequest({ username, password }) {
  const body = JSON.stringify({ username, password });
  return fetch(`${APIDOMAIN}/users/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  }).then(async (res) => {
    if (!res.ok) {
      throw Error("Nahhhh");
    } else {
      try {
        const userObject = await res.json();
        const userID = userObject.userID;
        return userID;
      } catch (error) {
        console.error(error);
      }
    }
  });
}

export async function sendUpdateUserRequest(id, { username, password, email }) {
  const body = JSON.stringify({ username, password, email });
  return fetch(`${APIDOMAIN}/users/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body,
  }).then(async (res) => {
    if (!res.ok) {
      throw Error("Nahhhh");
    }
  });
}

export async function sendUpdateAvatarRequest(id, file) {
  const body = new FormData();
  body.set("avatar", file);
  return fetch(`${APIDOMAIN}/users/${id}/avatar`, {
    method: "PUT",
    body,
  }).then(async (res) => {
    if (!res.ok) {
      throw Error("No image");
    }
  });
}
