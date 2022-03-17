import React from "react";
import Form from "../components/Form";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

async function sendCreateUserRequest({ id, username, password }) {
  const body = JSON.stringify({ username, password });
  console.log({ id, username, password });
  return fetch(`http://localhost:3001/users/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  }).then((res) => {
    if (!res.ok) {
      throw Error("Nahhhh");
    }
  });
}

function createUserID() {
  const userID = Math.floor(Math.random() * 26000);
  return userID;
}

export default function CreateUser() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Form onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="userName">Username</label>{" "}
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event?.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event?.target.value)}
      />
      <div>
        <Button
          color="300"
          style={{ display: "block" }}
          onClick={() => {
            sendCreateUserRequest({
              id: createUserID(),
              username: username,
              password: password,
            }).then(() => navigate("/user"));
          }}
        >
          Create User
        </Button>
      </div>
    </Form>
  );
}
