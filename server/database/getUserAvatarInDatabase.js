import { db } from "./connection.js";

export async function getUserAvatarInDatabase(id) {
  const getAvatarStatement = db.prepare(
    `SELECT user_avatar, avatar_mimetype FROM user
      WHERE user_id = ?`
  );
  await new Promise((res, rej) => {
    getAvatarStatement.get(id, (error, { user_avatar, avatar_mimetype }) => {
      if (error) {
        rej(error);
      } else {
        res({
          blob: user_avatar,
          mimeType: avatar_mimetype,
        });
      }
    });
  });
}
