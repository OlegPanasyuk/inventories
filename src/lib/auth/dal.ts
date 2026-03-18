import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { decryptSession } from "@/lib/auth/session";
import { findUserDtoById } from "@/lib/auth/users";

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decryptSession(cookie);

  if (!session?.userId) {
    redirect("/login");
  }

  return { isAuth: true, userId: session.userId };
});

export const getCurrentUser = cache(async () => {
  const session = await verifySession();
  const user = await findUserDtoById(session.userId);

  if (!user) {
    redirect("/login");
  }

  return user;
});