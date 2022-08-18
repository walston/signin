import express from "express";
import { createUserInDatabase, getUserFromDatabase } from "./database/index.js";
import { updateUserInDatabase } from "./database/updateUserInDatabase.js";
import { updateUserAvatarInDatabase } from "./database/updateUserAvatarInDatabase.js";
import { getUserAvatarInDatabase } from "./database/getUserAvatarInDatabase.js";
import path from "path";
import multer from "multer";

const USERS = new Map();
const router = express.Router();

router.use(express.json(), function logger(req, res, next) {
  console.log(req.method, req.path);
  console.log(req.headers);
  console.log(req.body);
  next();
});

router.get("/", function getAllUsers(req, res) {
  const users = Array.from(USERS.entries()).map(([id, value]) => {
    return {
      id,
      ...value,
    };
  });
  res.send(users);
});

router.get("/:id", async function getSingleUser(req, res) {
  const id = req.params.id;
  const user = await getUserFromDatabase(id);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send();
  }
});

/** @NOTE Expected request body: { username, password }*/
router.post("/", (req, res) => {
  const user = req.body;
  if (!user) {
    res.status(400).send();
  } else {
    createUserInDatabase(user.username, user.password)
      .then((user) => res.send(user))
      .catch(() => res.status(400).send());
  }
});

router.post("/:id", function createNewUser(req, res) {
  const id = req.params.id;
  const user = req.body;
  if (!user) {
    res.status(400).send();
  } else if (USERS.has(id)) {
    res.status(409).send();
  } else {
    USERS.set(id, user);
    res.status(201).send();
  }
});

router.put("/:id", async function updateSingleUser(req, res) {
  const id = req.params.id;
  const userUpdates = req.body;
  if (!userUpdates) {
    res.status(400).send();
  } else {
    try {
      await updateUserInDatabase(id, userUpdates);
      res.status(204).send();
    } catch (error) {
      console.log(error.message);
      res.status(500).send();
    }
  }
});

router.put(
  "/:id/avatar",
  multer({ storage: multer.memoryStorage() }).single("avatar"),
  async function updateUserAvatar(req, res) {
    try {
      const id = req.params.id;
      await updateUserAvatarInDatabase(req.file, id);
      res.status(204).send();
    } catch (error) {
      console.log(error);
      res.status(400).send();
    }
  }
);

router.get("/:id/avatar", async function getUserAvatar(req, res) {
  const id = req.params.id;
  try {
    const { mimeType, blob } = await getUserAvatarInDatabase(id);
    res.status(200).type(mimeType).send(blob);
  } catch (error) {
    console.log("Error", error);
    const dirname = path.dirname(import.meta.url.replace(`file://`, ""));
    const pathToFile = path.resolve(dirname, "./images/defaultAvatar.jpeg");
    res.status(200).type("jpeg").sendFile(pathToFile);
  }
});
/**
 * @NOTE
 * Make sure the data is saving in DB
 * Need a router.get(:id/avatar)
 * in the get() set up a 404 that replies with the airbender
 * instead of replying with 404 we reply with 200/the last airbender */

router.delete("/:id", function deleteSingleUser(req, res) {
  const id = req.params.id;
  if (!USERS.has(id)) {
    res.status(404).send();
  } else {
    USERS.delete(id);
    res.status(204).send();
  }
});

export default router;
