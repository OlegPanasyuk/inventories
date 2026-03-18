import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(160deg,#fef3c7_0%,#fff7ed_100%)] px-6 py-12 text-zinc-950">
      <main className="w-full max-w-2xl rounded-3xl border border-white/60 bg-white/90 p-8 shadow-xl shadow-amber-200/40 backdrop-blur">
        <div className="mb-8 space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-700">
            Authentication
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Create account</h1>
          <p className="text-sm text-zinc-600">
            User records are stored in PostgreSQL through Sequelize, and successful signup creates a signed session cookie.
          </p>
        </div>
        <SignupForm />
      </main>
    </div>
  );
}