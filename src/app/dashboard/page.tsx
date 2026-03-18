import { logout } from "@/lib/auth/actions";
import { getCurrentUser } from "@/lib/auth/dal";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#dbeafe_0%,#eff6ff_35%,#f8fafc_100%)] px-6 py-12 text-zinc-950">
      <main className="mx-auto max-w-4xl rounded-[2rem] border border-sky-100 bg-white/90 p-8 shadow-xl shadow-sky-100/60 backdrop-blur">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.2em] text-sky-700">
              Dashboard
            </p>
            <h1 className="text-4xl font-semibold tracking-tight">
              Welcome, {user.firstName} {user.lastName}
            </h1>
            <p className="max-w-2xl text-base text-zinc-600">
              This page is protected with the same pattern described in the Next.js authentication guide: optimistic route checks plus a server-side DAL verification before reading user data.
            </p>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 transition hover:border-zinc-950 hover:text-zinc-950"
            >
              Sign out
            </button>
          </form>
        </div>

        <section className="mt-10 grid gap-4 sm:grid-cols-3">
          <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm font-medium text-zinc-500">User ID</p>
            <p className="mt-3 text-2xl font-semibold">{user.id}</p>
          </article>
          <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm font-medium text-zinc-500">Email</p>
            <p className="mt-3 break-all text-lg font-semibold">{user.email}</p>
          </article>
          <article className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5">
            <p className="text-sm font-medium text-zinc-500">Session guard</p>
            <p className="mt-3 text-lg font-semibold">Verified in DAL</p>
          </article>
        </section>
      </main>
    </div>
  );
}