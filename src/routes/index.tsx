import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateUser from "./CreateUser";
import MainUser from "./MainUser";
import Home from "./Home";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="create/" element={<CreateUser />} />
        <Route path="user/">
          <Route path=":id" element={<MainUser />} />
          <Route path="delete/" element="Delete user" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
