import sqlite3 from "sqlite3";
import zxcvbn from "zxcvbn";
import argon2 from "argon2";
import csprng from "csprng";

const USERS_DB_PATH = "./users.db";
let db = new sqlite3.Database(
  USERS_DB_PATH,
  sqlite3.OPEN_READWRITE,
  (error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
  }
);

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
    `INSERT INTO user(user_name, hash, salt) VALUES (?,?,?);`
  );
  const selectStatement = db.prepare(
    `SELECT user_name, user_id FROM user ORDER BY user_id DESC LIMIT 1;`
  );
  const salt = await csprng(160, 36);
  const hashPassword = await argon2.hash(user_pass + salt);
  return new Promise((res, rej) => {
    insertStatement.run(user_name, hashPassword, salt).finalize((error) => {
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

export async function validateUserFromDatabase(username, password) {
  const selectStatement = db.prepare(
    `SELECT user_name, user_id, hash, salt FROM user WHERE user_name = ?;`
  );
  return new Promise((res, rej) => {
    selectStatement.get(
      username,
      async (error, { user_name, user_id, hash, salt }) => {
        if (error) {
          rej(error);
          return;
        }
        const passwordVerified = await argon2.verify(hash, password + salt);
        if (passwordVerified) {
          res({
            userID: user_id,
            username: user_name,
          });
        } else {
          rej(new Error("Not authorized"));
        }
      }
    );
  });
}
