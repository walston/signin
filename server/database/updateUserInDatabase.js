import { db } from "./connection.js";
import zxcvbn from "zxcvbn";
import EmailValidator from "email-validator";
import { passwordSecurity } from "./passwordSecurity.js";

export async function updateUserInDatabase(id, { username, pass, email }) {
  const alphaCheck = /[a-zA-Z]/;
  if (
    typeof username === "string" &&
    username !== "" &&
    alphaCheck.test(username)
  ) {
    console.log("Username s'good");
    const updateUsernameStatement = db.prepare(
      `UPDATE user
        SET user_name = ? WHERE user_id = ?`
    );
    await new Promise((res, rej) => {
      updateUsernameStatement.run(username, id).finalize((error) => {
        if (error) {
          rej(error);
        } else {
          res();
        }
      });
    });
  } else {
    throw Error(
      "UserInputError: username doesn't match expected format /[a-zA-Z]/"
    );
  }

  if (typeof pass === "string" && pass !== "") {
    const passCheck = zxcvbn(pass);

    if (passCheck.score >= 2) {
      console.log("It's a solid password");
      const passSecurity = await passwordSecurity(pass);
      const updateSaltedHashStatement = db.prepare(
        `UPDATE user
        SET hash = ? AND salt = ? WHERE user_id = ?`
      );
      await new Promise((res, rej) => {
        updateSaltedHashStatement
          .run(passSecurity.hash, passSecurity.salt, id)
          .finalize((error) => {
            if (error) {
              rej(error);
            } else {
              res();
            }
          });
      });
    } else {
      throw Error("UserInputError: " + passCheck.feedback.warning);
    }
  }

  if (typeof email === "string" && email !== "") {
    const isEmailValid = EmailValidator.validate(email);
    if (isEmailValid) {
      console.log("Email s'good");
      const updateEmailStatement = db.prepare(
        `UPDATE user
        SET user_email = ? WHERE user_id = ?`
      );
      await new Promise((res, rej) => {
        updateEmailStatement.run(email, id).finalize((error) => {
          if (error) {
            rej(error);
          } else {
            res();
          }
        });
      });
    } else {
      console.log("Invalid email input");
    }
  }
}
