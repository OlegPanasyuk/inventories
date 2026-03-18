"use server";

import { redirect } from "next/navigation";
import type { FormState } from "@/lib/auth/definitions";
import { validateLoginForm, validateSignupForm } from "@/lib/auth/definitions";
import { hashPassword, verifyPassword } from "@/lib/auth/password";
import { createSession, deleteSession } from "@/lib/auth/session";
import { createUser, findUserByEmail } from "@/lib/auth/users";

export async function signup(state: FormState, formData: FormData): Promise<FormState> {
  const { data, errors } = validateSignupForm(formData);

  if (errors) {
    return { errors };
  }

  const existingUser = await findUserByEmail(data.email);

  if (existingUser) {
    return {
      message: "An account with that email already exists.",
    };
  }

  const passwordHash = await hashPassword(data.password);
  const user = await createUser({
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    passwordHash,
  });

  await createSession(user.id);
  redirect("/dashboard");
}

export async function login(state: FormState, formData: FormData): Promise<FormState> {
  const { data, errors } = validateLoginForm(formData);

  if (errors) {
    return { errors };
  }

  const user = await findUserByEmail(data.email);

  if (!user?.passwordHash) {
    return {
      message: "Invalid email or password.",
    };
  }

  const isPasswordValid = await verifyPassword(data.password, user.passwordHash);

  if (!isPasswordValid) {
    return {
      message: "Invalid email or password.",
    };
  }

  await createSession(user.id);
  redirect("/dashboard");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}