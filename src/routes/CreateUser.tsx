import React from "react";
import Form from "../components/Form";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

const APIDOMAIN = process.env.REACT_APP_API_DOMAIN;

async function sendCreateUserRequest({ username, password }) {
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
        console.log(await res.json());
      } catch (error) {
        console.error(error);
      }
    }
  });
}

export default function CreateUser() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const displayErrorMessage = () => setError("There's a problem");
  return (
    <Form
      style={{ margin: "300px auto" }}
      onSubmit={(event) => event.preventDefault()}
    >
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
              username: username,
              password: password,
            })
              .then(() => navigate("/user"))
              .catch(() => displayErrorMessage());
          }}
        >
          Create User
        </Button>
      </div>
    </Form>
  );
}
