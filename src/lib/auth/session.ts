import "server-only";

import { createCipheriv, createDecipheriv, createHash, randomBytes } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "session";
const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 7;
const IV_LENGTH = 12;
const AUTH_TAG_LENGTH = 16;

type SessionPayload = {
  userId: number;
  expiresAt: string;
};

function getSessionSecret() {
  const secret = process.env.SESSION_SECRET;

  if (!secret) {
    throw new Error("SESSION_SECRET is not configured.");
  }

  return createHash("sha256").update(secret).digest();
}

function encodeSession(payload: SessionPayload) {
  const iv = randomBytes(IV_LENGTH);
  const cipher = createCipheriv("aes-256-gcm", getSessionSecret(), iv);
  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(payload), "utf8"),
    cipher.final(),
  ]);
  const authTag = cipher.getAuthTag();

  return Buffer.concat([iv, authTag, encrypted]).toString("base64url");
}

export async function decryptSession(token?: string) {
  if (!token) {
    return null;
  }

  try {
    const buffer = Buffer.from(token, "base64url");
    const iv = buffer.subarray(0, IV_LENGTH);
    const authTag = buffer.subarray(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
    const encrypted = buffer.subarray(IV_LENGTH + AUTH_TAG_LENGTH);
    const decipher = createDecipheriv("aes-256-gcm", getSessionSecret(), iv);

    decipher.setAuthTag(authTag);

    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ]).toString("utf8");

    const session = JSON.parse(decrypted) as SessionPayload;

    if (new Date(session.expiresAt) <= new Date()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);
  const session = encodeSession({ userId, expiresAt: expiresAt.toISOString() });

  (await cookies()).set(SESSION_COOKIE_NAME, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    expires: expiresAt,
    path: "/",
  });
}

export async function updateSession(token?: string) {
  const session = await decryptSession(token);

  if (!session?.userId) {
    return null;
  }

  await createSession(session.userId);
  return session;
}

export async function deleteSession() {
  (await cookies()).delete(SESSION_COOKIE_NAME);
}