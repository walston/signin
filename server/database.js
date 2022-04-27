import sqlite3 from "sqlite3";
import zxcvbn from "zxcvbn";
import { exit } from "process";

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
export function createDatabase() {
  var newdb = new sqlite3.Database(USERS_DB_PATH, (error) => {
    if (error) {
      console.error(error);
      exit(1);
    }
    createTables(newdb);
  });
  db = newdb;
}
export function createTables(newdb) {
  newdb.exec(
    `
    create table user (
      user_id int primary key not null,
      user_name text not null,
      user_pass text not null
    );
    insert into user (user_id, user_name, user_pass)
      values (001, 'Nikki', 'Drums'),
             (002, 'Joon', 'MouseHeads'),
             (003, 'Nate', 'DnD');

    
  `,
    () => console.log("something")
  );
}
export async function createUserInDatabase(user_name, user_pass) {
  const alphaCheck = /[a-zA-Z]/;
  if (alphaCheck.test(user_name)) {
    console.log("Username s'good");
  } else {
    throw Error(
      "UserInputError: username doesn't match expected format /[a-zA-Z]/"
    );
  }
  const passCheck = zxcvbn(user_pass);
  if (passCheck.score >= 2) {
    console.log("Password s'good as well");
  } else {
    throw Error("UserInputError: " + passCheck.feedback.warning);
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
          res({
            userID: user_id,
            username: user_name,
          });
        }
      });
    });
  });
}

export async function getUserFromDatabase(id) {
  const selectStatement = db.prepare(
    `SELECT user_name, user_id FROM user WHERE user_id = ?;`
  );
  return new Promise((res, rej) => {
    selectStatement.get(id, (error, { user_id, user_name }) => {
      if (error) {
        rej(error);
      } else {
        res({
          userID: user_id,
          username: user_name,
        });
      }
    });
  });
}
