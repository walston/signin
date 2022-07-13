import "./Home.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { login } from "../api/login";

/**
 * @TODO
 * ALL WE HAVE TO DO NOW IS:
 * -populate the page with a {User} that has username, pass, and image
 * -Want to use blobs for user avatar image
 */

export default function Home() {
  const navigate = useNavigate();

  return (
    <Form
      action="/login"
      onSubmit={(event) => {
        const username = event.target.elements.username.value;
        const password = event.target.elements.pass.value;
        event.preventDefault();
        login(username, password).then(({ userID }) => {
          navigate(`/user/${userID}`);
        });
      }}
    >
      <label htmlFor="username">Username</label>
      <input type="text" id="username" />
      <label htmlFor="pass">Password</label>
      <input type="password" id="pass" />
      <div className="btnCont">
        <Button color="80" type="submit">
          Login
        </Button>
        <Button color="20" onClick={() => navigate("/create")}>
          Sign Up
        </Button>
      </div>
    </Form>
  );
}
