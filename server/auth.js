import express from "express";
import { validateUserInDB } from "./database/index.js";

const router = express.Router();
router.use(express.json());
router.post("/login", async (req, res) => {
  const user = req.body;

  try {
    const userInfo = await validateUserInDB(user.username, user.password);
    res.send(userInfo);
  } catch (error) {
    res.sendStatus(401);
  }
});

export default router;
