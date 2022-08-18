import express from "express";
import { validateUserFromDatabase } from "./database/index.js";

const router = express.Router();
router.use(express.json());
router.post("/login", async (req, res) => {
  const user = req.body;

  try {
    const userInfo = await validateUserFromDatabase(
      user.username,
      user.password
    );
    res.send(userInfo);
  } catch (error) {
    res.sendStatus(401);
  }
});

export default router;
