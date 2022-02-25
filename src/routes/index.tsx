import { BrowserRouter, Route, Routes } from "react-router-dom";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element="HOME" />
        <Route path="create/" element="Create new user" />
        <Route path="user/">
          <Route index element="Main User" />
          <Route path="edit/" element="User edit" />
          <Route path="delete/" element="Delete user" />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
