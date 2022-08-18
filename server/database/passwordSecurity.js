import argon2 from "argon2";
import csprng from "csprng";

export async function passwordSecurity(pass) {
  const salt = await csprng(160, 36);
  const hashPassword = await argon2.hash(pass + salt);

  return {
    hash: hashPassword,
    salt: salt,
  };
}
