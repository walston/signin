import "./Home.css";
import Button from "../components/Button";
export default function Home() {
  return (
    <form action="/login" onSubmit={(event) => event.preventDefault()}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" />
      <label htmlFor="pass">Password</label>
      <input type="password" id="pass" />
      <Button color="20">Submit</Button>
    </form>
  );
}
