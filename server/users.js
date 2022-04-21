import express from "express";
import { exit } from "process";
import sqlite3 from "sqlite3";

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

router.get("/:id", function getSingleUser(req, res) {
  const id = req.params.id;
  const user = USERS.get(id);
  if (user) {
    res.status(200).send(user);
  } else {
    res.status(404).send();
  }
});
//Expected request body: { username, password }
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

router.put("/:id", function updateSingleUser(req, res) {
  const id = req.params.id;
  const userUpdates = req.body;
  if (!userUpdates) {
    res.status(400).send();
  } else if (!USERS.has(id)) {
    res.status(404).send();
  } else {
    const user = USERS.get(id);
    USERS.set(id, { ...user, ...userUpdates });
    res.status(204).send();
  }
});

router.delete("/:id", function deleteSingleUser(req, res) {
  const id = req.params.id;
  if (!USERS.has(id)) {
    res.status(404).send();
  } else {
    USERS.delete(id);
    res.status(204).send();
  }
});

const USERS_DB_PATH = "./users.db";
let db = new sqlite3.Database(
  USERS_DB_PATH,
  sqlite3.OPEN_READWRITE,
  (error) => {
    if (error && error.code === "SQLITE_CANTOPEN") {
      return createDatabase();
    } else if (error) {
      console.error(error);
      process.exit(1);
    }
  }
);
function createDatabase() {
  var newdb = new sqlite3.Database(USERS_DB_PATH, (error) => {
    if (error) {
      console.error(error);
      exit(1);
    }
    createTables(newdb);
  });
  db = newdb;
}
function createTables(newdb) {
  newdb.exec(
    `
    create table user (
      user_id int primary key not null,
      user_name text not null,
      user_pass text not null
    );
    insert into user (user_id, user_name, user_pass)
      values (001, 'Nikki', 'Butts'),
             (002, 'Joon', 'MouseHeads'),
             (003, 'Nate', 'DnD');

    
  `,
    () => console.log("something")
  );
}
async function createUserInDatabase(user_name, user_pass) {
  const alphaCheck = /[a-zA-Z]/;
  if (alphaCheck.test(user_name)) {
    console.log("s'good");
  } else {
    throw Error(
      "UserInputError: username doesn't match expected format /[a-zA-Z]/"
    );
  }
  const insertStatement = db.prepare(
    `INSERT INTO user(user_name, user_pass) VALUES (?,?);`
  );
  const selectStatement = db.prepare(
    `SELECT user_name, user_id FROM user ORDER BY user_id DESC LIMIT 1;`
  );
  return new Promise((res, rej) => {
    insertStatement.run(user_name, user_pass).finalize((error) => {
      if (error) {
        rej(error);
        return;
      }
      selectStatement.get((error, { user_id, user_name }) => {
        if (error) {
          rej(error);
        } else {
          console.log(user_id, user_name);
          res({
            userID: user_id,
            username: user_name,
          });
        }
      });
    });
  });
}

export default router;
