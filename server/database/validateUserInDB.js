import argon2 from "argon2";
import { db } from "./connection.js";
import crypto from "crypto";

export async function validateUserInDB(username, password) {
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
          const token = await createUserSessionInDB(user_id);
          res({
            userID: user_id,
            username: user_name,
            token,
          });
        } else {
          rej(new Error("Not authorized"));
        }
      }
    );
  });
}

export async function createUserSessionInDB(user_id) {
  const insertStatement = db.prepare(
    `INSERT INTO sessions(user_id, last_active, token) VALUES (?,?,?);`
  );
  const lastActive = Date.now();
  const token = crypto.randomUUID();

  return new Promise((res, rej) => {
    insertStatement.run(user_id, lastActive, token).finalize((error) => {
      if (error) {
        rej(error);
      } else {
        res(token);
      }
    });
  });
}
