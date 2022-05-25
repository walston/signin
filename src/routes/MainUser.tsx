import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../api/user";
import Button from "../components/Button";
import Form from "../components/Form";
import "./MainUser.css";

type User = { userID: number; username: string; isLoading: false };
type UserLoading = { isLoading: true };
export default function MainUser() {
  const { id } = useParams();
  console.log(id);
  const [user, setUser] = React.useState<User | UserLoading>({
    isLoading: true,
  });
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
        <input type="text" placeholder={user.username} />
        <label>Password</label>
        <input type="password" placeholder="PASSWORD" />
        <label>Email</label>
        <input type="email" placeholder="DYANAMIC EMAIL" />
      </Form>
      <div id="btnCont">
        {" "}
        <Button color="1000">Update User</Button>
        <Button color="3">Delete User</Button>
      </div>
    </div>
  );
}
