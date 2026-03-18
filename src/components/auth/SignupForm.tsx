"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signup } from "@/lib/auth/actions";

export function SignupForm() {
  const [state, action, pending] = useActionState(signup, undefined);

  return (
    <form action={action} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-zinc-700">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            autoComplete="given-name"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-950"
            placeholder="Jane"
          />
          {state?.errors?.firstName && (
            <p className="text-sm text-red-600">{state.errors.firstName.join(" ")}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-zinc-700">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            autoComplete="family-name"
            className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-950"
            placeholder="Doe"
          />
          {state?.errors?.lastName && (
            <p className="text-sm text-red-600">{state.errors.lastName.join(" ")}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-950"
          placeholder="jane@example.com"
        />
        {state?.errors?.email && (
          <p className="text-sm text-red-600">{state.errors.email.join(" ")}</p>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-zinc-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none transition focus:border-zinc-950"
          placeholder="At least 8 characters"
        />
        {state?.errors?.password && (
          <p className="text-sm text-red-600">{state.errors.password.join(" ")}</p>
        )}
      </div>

      {state?.message && <p className="text-sm text-red-600">{state.message}</p>}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-xl bg-zinc-950 px-4 py-3 font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-400"
      >
        {pending ? "Creating account..." : "Create account"}
      </button>

      <p className="text-sm text-zinc-600">
        Already have an account? <Link href="/login" className="font-medium text-zinc-950">Sign in</Link>
      </p>
    </form>
  );
}