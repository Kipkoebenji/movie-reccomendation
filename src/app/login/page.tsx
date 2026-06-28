import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signInWithEmail } from "./actions";

type SearchParams = {
  error?: string;
};

interface LoginPageProps {
  searchParams: Promise<SearchParams>;
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const errorMessage = params.error;

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md items-center px-6 py-16">
      <Card className="w-full border border-slate-200 bg-white/80 shadow-lg backdrop-blur">
        <CardHeader>
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-slate-500">
            Authentication
          </p>
          <CardTitle>Sign in</CardTitle>
        </CardHeader>

        <CardContent>
          <form action={signInWithEmail} className="space-y-4">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition focus:border-slate-500 focus:ring-2 focus:ring-slate-200"
                placeholder="Your password"
              />
            </div>

            {errorMessage ? (
              <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errorMessage}
              </p>
            ) : null}

            <Button type="submit" className="w-full">
              Sign In
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-slate-600">
            New here?{" "}
            <Link
              href="/signup"
              className="font-semibold text-slate-900 hover:underline"
            >
              Create an account
            </Link>
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
