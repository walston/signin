import { db } from "./connection.js";

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
