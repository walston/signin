import React from "react";
import Form from "../components/Form";
import Button from "../components/Button";

export default function CreateUser() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  return (
    <Form>
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
        <Button color="300" style={{ display: "block" }}>
          Create User
        </Button>
      </div>
    </Form>
  );
}
