import { db } from "./connection.js";

export async function getUserAvatarInDatabase(id) {
  const getAvatarStatement = db.prepare(
    `SELECT user_avatar, avatar_mimetype FROM user
      WHERE user_id = ?`
  );
  return new Promise((res, rej) => {
    getAvatarStatement.get(id, (error, { user_avatar, avatar_mimetype }) => {
      if (error) {
        rej(error);
      } else if (user_avatar && avatar_mimetype) {
        res({
          blob: user_avatar,
          mimeType: avatar_mimetype,
        });
      } else {
        rej(new Error("User avatar not found"));
      }
    });
  });
}
