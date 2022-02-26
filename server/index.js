import express from "express";
import users from "./users";

const PORT = process.env.PORT || 3001;

const app = express();
app.use((_req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use("/users", users);

app.listen(PORT, () => console.log(`listening on ${PORT}`));
