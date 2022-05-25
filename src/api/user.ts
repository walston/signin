//user returns the unique userID and username
export async function getUser(id) {
  return fetch(`//localhost:3001/users/${id}`, {
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
