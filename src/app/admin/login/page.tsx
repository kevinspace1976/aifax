"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const FIELD =
  "mt-1 w-full rounded-lg border border-white/20 bg-slate-900/70 px-3 py-2 text-sm text-white " +
  "placeholder:text-slate-500 focus:border-cyan-300 focus:outline-none focus:ring-1 focus:ring-cyan-300";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password })
      });
      const body = await res.json();
      if (!res.ok) {
        setError(body.error || "Could not sign in.");
        return;
      }
      router.push(searchParams?.get("next") || "/admin");
      router.refresh();
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card-surface w-full max-w-sm p-6">
      <h1 className="text-xl font-semibold text-white">Admin</h1>
      <p className="mt-2 text-sm text-slate-300">Site analytics and leads.</p>
      <label className="mt-5 block text-sm font-medium text-slate-200" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        autoFocus
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={FIELD}
      />
      {error ? <p className="mt-2 text-sm text-orange-300">{error}</p> : null}
      <button type="submit" disabled={submitting} className="btn-primary mt-5 w-full disabled:opacity-60">
        {submitting ? "Checking..." : "Sign in"}
      </button>
    </form>
  );
}

export default function AdminLoginPage() {
  return (
    <main className="section-shell flex min-h-[60vh] items-center justify-center py-16">
      {/* useSearchParams() (to preserve a ?next= redirect target) requires
          a Suspense boundary so this page can still be statically
          prerendered rather than forcing the whole route dynamic. */}
      <Suspense fallback={null}>
        <LoginForm />
      </Suspense>
    </main>
  );
}
