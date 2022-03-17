import "./Home.css";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Form
      action="/login"
      style={{ margin: "300px auto" }}
      onSubmit={(event) => event.preventDefault()}
    >
      <label htmlFor="email">Email</label>
      <input type="email" id="email" />
      <label htmlFor="pass">Password</label>
      <input type="password" id="pass" />
      <div className="btnCont">
        <Button color="20" onClick={() => navigate("/create")}>
          Sign Up
        </Button>
        <Button color="80">Login</Button>
      </div>
    </Form>
  );
}
