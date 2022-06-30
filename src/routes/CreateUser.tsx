import React from "react";
import Form from "../components/Form";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import { sendCreateUserRequest } from "../api/user";

export default function CreateUser() {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState("");
  const displayErrorMessage = () => setError("There's a problem");
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
              username: username,
              password: password,
            })
              .then((id) => navigate(`/user/${id}`))
              .catch(() => displayErrorMessage());
          }}
        >
          Create User
        </Button>
      </div>
    </Form>
  );
}
