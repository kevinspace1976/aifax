export default async function UnsubscribedPage({
  searchParams
}: {
  searchParams: Promise<{ ok?: string }>;
}) {
  const { ok } = await searchParams;
  const success = ok !== "0";

  return (
    <main className="section-shell flex min-h-[50vh] items-center justify-center py-16">
      <div className="card-surface max-w-md p-6 text-center">
        <h1 className="text-xl font-semibold text-slate-900">
          {success ? "You're unsubscribed" : "That link didn't work"}
        </h1>
        <p className="mt-3 text-sm text-slate-700">
          {success
            ? "You won't get any more emails in this series. If that was a mistake, just email us at info@aifax.net."
            : "This unsubscribe link is invalid or expired. Email info@aifax.net and we'll take care of it directly."}
        </p>
      </div>
    </main>
  );
}
