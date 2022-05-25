import sqlite3 from "sqlite3";

const USERS_DB_PATH = "./users.db";
export let db = new sqlite3.Database(
  USERS_DB_PATH,
  sqlite3.OPEN_READWRITE,
  (error) => {
    if (error) {
      console.error(error);
      process.exit(1);
    }
  }
);
