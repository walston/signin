//login returns the unique userID and username
export async function login(username, pass) {
  return fetch("//localhost:3001/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password: pass }),
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
