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
    connectionDetails =
      error instanceof Error ? error.message : "Unknown database error";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100 px-6 py-12 font-sans text-zinc-950">
      <main className="w-full max-w-2xl rounded-3xl border border-zinc-200 bg-white p-10 shadow-sm">
        <div className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-zinc-500">
            PostgreSQL / Sequelize
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            Database connection status
          </h1>
          <p className="text-lg text-zinc-600">
            Sequelize is configured for runtime access and CLI-based migrations.
          </p>
        </div>

        <section className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-6">
          <div className="flex items-center justify-between gap-4">
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
        </section>
      </main>
    </div>
  );
}