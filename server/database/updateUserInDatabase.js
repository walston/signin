import { db } from "./connection.js";
import zxcvbn from "zxcvbn";
import EmailValidator from "email-validator";
import { passwordSecurity } from "./passwordSecurity.js";

export async function updateUserInDatabase(id, { username, pass, email }) {
  const hasUsername = typeof username === "string" && username !== "";
  const hasPassword = typeof pass === "string" && pass !== "";
  const hasEmail = typeof email === "string" && email !== "";

  if (hasUsername) {
    const alphaCheck = /[a-zA-Z]/;
    if (alphaCheck.test(username)) {
      console.log("Username s'good");
    } else {
      throw Error(
        "UserInputError: username doesn't match expected format /[a-zA-Z]/"
      );
    }
  }

  if (hasPassword) {
    const passCheck = zxcvbn(pass);
    if (passCheck.score >= 2) {
      console.log("It's a solid password");
    } else {
      throw Error("UserInputError: " + passCheck.feedback.warning);
    }
  }

  if (hasEmail) {
    const isEmailValid = EmailValidator.validate(email);
    if (isEmailValid) {
      console.log("Email s'good");
    } else {
      console.log("Invalid email input");
    }
  }

  if (hasUsername) {
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
  }

  if (hasPassword) {
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
  }

  if (hasEmail) {
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
  }
}
