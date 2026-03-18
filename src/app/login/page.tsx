import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(160deg,#f4f4f5_0%,#e4e4e7_100%)] px-6 py-12 text-zinc-950">
      <main className="w-full max-w-md rounded-3xl border border-white/50 bg-white/90 p-8 shadow-xl shadow-zinc-300/30 backdrop-blur">
        <div className="mb-8 space-y-3">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            Authentication
          </p>
          <h1 className="text-3xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-sm text-zinc-600">
            This follows the Next.js App Router authentication guide with server actions and cookie sessions.
          </p>
        </div>
        <LoginForm />
      </main>
    </div>
  );
}