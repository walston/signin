import { db } from "./connection.js";

export async function updateUserAvatarInDatabase({ buffer, mimetype }, id) {
  const updateAvatarStatement = db.prepare(
    `UPDATE user
        SET user_avatar = ? and avatar_mimetype = ? WHERE user_id = ?`
  );
  await new Promise((res, rej) => {
    updateAvatarStatement.run(buffer, mimetype, id).finalize((error) => {
      if (error) {
        rej(error);
      } else {
        res();
      }
    });
  });
}
