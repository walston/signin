import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser, sendUpdateUserRequest } from "../api/user";
import Button from "../components/Button";
import Form from "../components/Form";
import "./MainUser.css";

type User = { userID: number; username: string; isLoading: false };
type UserLoading = { isLoading: true };

export default function MainUser() {
  const { id } = useParams();

  const [user, setUser] = React.useState<User | UserLoading>({
    isLoading: true,
  });
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  useEffect(() => {
    getUser(id).then((user) => {
      setUser({ ...user, isLoading: false });
    });
  }, [id, setUser]);
  if (user.isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }
  return (
    <div className="MainUser">
      <div id="avatar"></div>
      <h1 id="hello">Hello, {user.username}.</h1>
      <Form>
        <label>Username</label>
        <input
          type="text"
          placeholder={user.username}
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Password</label>
        <input
          type="password"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <label>Email</label>
        <input
          type="email"
          placeholder="DYANAMIC EMAIL"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      </Form>
      <div id="btnCont">
        {" "}
        <Button
          onClick={() => {
            sendUpdateUserRequest(id, { username, password, email })
              .then(console.log)
              /**
               * @TODO
               * Present user with error UI and success UI
               * */
              .catch(console.error);
          }}
          //add error handling to sendUpdateUserRequest()
          color="1000"
        >
          Update User
        </Button>
        <Button color="3">Delete User</Button>
      </div>
    </div>
  );
}
