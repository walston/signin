import React from "react";
import Button from "../components/Button";
import Form from "../components/Form";
import "./MainUser.css";

export default function MainUser() {
  return (
    <div className="MainUser">
      <div id="avatar"></div>
      <h1 id="hello">Hello, DYNAMIC USERNAME.</h1>
      <Form>
        <label>Username</label>
        <input type="text" placeholder="DYANAMIC USERNAME" />
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
