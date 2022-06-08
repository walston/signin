import zxcvbn from "zxcvbn";
import { db } from "./connection.js";
import { passwordSecurity } from "./passwordSecurity.js";

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
  const { hash, salt } = await passwordSecurity(user_pass);

  return new Promise((res, rej) => {
    insertStatement.run(user_name, hash, salt).finalize((error) => {
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
