import argon2 from "argon2";
import { db } from "./connection.js";

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
