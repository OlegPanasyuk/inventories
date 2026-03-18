import Link from "next/link";
import { verifyDatabaseConnection } from "@/lib/db_connector";

export const runtime = "nodejs";

export default async function Home() {
  let connectionStatus = "Connected";
  let connectionDetails = "";

  try {
    const connection = await verifyDatabaseConnection();
    connectionDetails = `${connection.host}:${connection.port} / ${connection.database}`;
  } catch (error) {
    connectionStatus = "Connection failed";
    connectionDetails = error instanceof Error ? error.message : "Unknown database error";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[linear-gradient(145deg,#f8fafc_0%,#e2e8f0_100%)] px-6 py-12 text-zinc-950">
      <main className="w-full max-w-4xl rounded-[2rem] border border-white/60 bg-white/85 p-8 shadow-xl shadow-slate-300/40 backdrop-blur">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.9fr]">
          <section className="space-y-5">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Inventories
            </p>
            <h1 className="max-w-2xl text-5xl font-semibold tracking-tight text-slate-950">
              App Router authentication with Sequelize and PostgreSQL.
            </h1>
            <p className="max-w-xl text-lg text-slate-600">
              The authentication flow follows the Next.js guide with server actions, a session cookie, route protection, and a data access layer that verifies the session before serving protected user data.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/login" className="rounded-full bg-slate-950 px-5 py-3 font-medium text-white transition hover:bg-slate-800">
                Sign in
              </Link>
              <Link href="/signup" className="rounded-full border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:border-slate-950 hover:text-slate-950">
                Create account
              </Link>
              <Link href="/dashboard" className="rounded-full border border-sky-300 bg-sky-50 px-5 py-3 font-medium text-sky-800 transition hover:border-sky-500 hover:bg-sky-100">
                Open dashboard
              </Link>
            </div>
          </section>

          <section className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-slate-500">
              Database
            </p>
            <div className="mt-6 flex items-center justify-between gap-4">
              <span className="text-sm font-medium text-zinc-500">Status</span>
              <span
                className={`rounded-full px-3 py-1 text-sm font-semibold ${
                  connectionStatus === "Connected"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {connectionStatus}
              </span>
            </div>
            <p className="mt-4 break-all font-mono text-sm text-zinc-700">
              {connectionDetails}
            </p>
            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4">
              <p className="text-sm font-medium text-slate-500">Guide-aligned pieces</p>
              <ul className="mt-3 space-y-2 text-sm text-slate-700">
                <li>Server actions for sign up, sign in, and sign out</li>
                <li>Encrypted HTTP-only session cookie</li>
                <li>Proxy-based optimistic route checks</li>
                <li>DAL verification before protected reads</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}