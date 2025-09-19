"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) setError(res.error);
    } catch (err) {
      setError("Unable to sign in with email/password. Not implemented yet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[100svh] flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md rounded-xl border border-black/10 dark:border-white/10 bg-white dark:bg-black/40 p-6 shadow-sm">
        <div className="flex flex-col items-center gap-2 mb-6">
          <Image src="/next.svg" alt="Logo" width={64} height={24} className="dark:invert" />
          <h1 className="text-xl font-semibold text-foreground">Se connecter</h1>
          <p className="text-sm text-muted-foreground text-center">
            Choisissez une méthode d'authentification.
          </p>
        </div>

        <div className="grid gap-3">
          <button
            onClick={() => signIn("google", { callbackUrl: "/" })}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-3 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M12 11v2h5.6c-.2 1.3-.6 2.2-1.4 3a6.6 6.6 0 0 1-4.2 1.6 7 7 0 1 1 0-14 6.7 6.7 0 0 1 4.8 2l1.6-1.6A8.8 8.8 0 0 0 12 3a9 9 0 1 0 0 18c2.4 0 4.5-.8 6-2.3 1.6-1.5 2.3-3.7 2.3-6.3V11H12z" fill="currentColor" />
            </svg>
            Continuer avec Google
          </button>

          <button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-black/10 dark:border-white/10 px-3 py-2 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/10"
          >
            <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
              <path d="M8 0C3.58 0 0 3.58 0 8a8 8 0 0 0 5.47 7.59c.4.07.55-.17.55-.38v-1.33c-2.23.49-2.7-1.07-2.7-1.07-.37-.96-.9-1.22-.9-1.22-.73-.5.06-.49.06-.49.8.06 1.22.84 1.22.84.72 1.22 1.9.87 2.36.66.07-.52.28-.87.5-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.58.84-2.13-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.33-.27 2.02-.27.69 0 1.38.09 2.02.27 1.52-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.53.55.84 1.26.84 2.13 0 3.07-1.86 3.75-3.64 3.95.29.25.54.73.54 1.48v2.2c0 .21.15.46.55.38A8 8 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
            </svg>
            Continuer avec GitHub
          </button>
        </div>

        <div className="my-6 h-px bg-black/10 dark:bg-white/10" />

        <form onSubmit={onCredentials} className="grid gap-3">
          <div className="grid gap-1">
            <label htmlFor="email" className="text-sm">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="grid gap-1">
            <label htmlFor="password" className="text-sm">Mot de passe</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="rounded-md border border-black/10 dark:border-white/10 bg-transparent px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
              placeholder="••••••••"
              required
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-md bg-primary text-white px-3 py-2 text-sm font-medium hover:opacity-90 disabled:opacity-50"
            title="Non implémenté (password hash manquant)"
          >
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>

        <p className="mt-6 text-xs text-muted-foreground text-center">
          En vous connectant, vous acceptez nos
          {" "}
          <Link href="#" className="underline hover:no-underline">termes</Link>
          {" "}et{ " "}
          <Link href="#" className="underline hover:no-underline">politique de confidentialité</Link>.
        </p>
      </div>
    </div>
  );
}
