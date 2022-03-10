import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateUser from "./CreateUser";
import Home from "./Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route
          path="create/"
          element={<CreateUser children="Create new user" />}
        />
        <Route path="user/">
          <Route index element="Main User" />
          <Route path="edit/" element="User edit" />
          <Route path="delete/" element="Delete user" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
