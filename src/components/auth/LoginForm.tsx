"use client";

import Link from "next/link";
import { useActionState } from "react";
import { login } from "@/lib/auth/actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, undefined);

  return (
    <form action={action} className="space-y-5">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-zinc-700">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none ring-0 transition focus:border-zinc-950"
          placeholder="you@example.com"
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
          autoComplete="current-password"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 outline-none ring-0 transition focus:border-zinc-950"
          placeholder="Your password"
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
        {pending ? "Signing in..." : "Sign in"}
      </button>

      <p className="text-sm text-zinc-600">
        Need an account? <Link href="/signup" className="font-medium text-zinc-950">Create one</Link>
      </p>
    </form>
  );
}