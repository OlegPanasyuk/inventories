import "server-only";

import { randomBytes, scryptSync, timingSafeEqual } from "node:crypto";

const SALT_BYTES = 16;
const KEY_LENGTH = 64;

export async function hashPassword(password: string) {
  const salt = randomBytes(SALT_BYTES).toString("hex");
  const hash = scryptSync(password, salt, KEY_LENGTH).toString("hex");

  return `${salt}:${hash}`;
}

export async function verifyPassword(password: string, passwordHash: string) {
  const [salt, storedHash] = passwordHash.split(":");

  if (!salt || !storedHash) {
    return false;
  }

  const computedHash = scryptSync(password, salt, KEY_LENGTH);
  const storedHashBuffer = Buffer.from(storedHash, "hex");

  if (computedHash.length !== storedHashBuffer.length) {
    return false;
  }

  return timingSafeEqual(computedHash, storedHashBuffer);
}