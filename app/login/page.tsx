import { signIn, signUp } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>
}) {
  const params = await searchParams

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#faf8f3] px-4">
      <div className="w-full max-w-sm rounded-2xl border border-emerald-900/10 bg-white p-8">
        <h1 className="mb-1 text-xl font-semibold text-emerald-950">Everweight</h1>
        <p className="mb-6 text-sm text-emerald-800/60">
          Sign in to your account, or create one below.
        </p>

        {params.error && (
          <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {params.error}
          </p>
        )}
        {params.message && (
          <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
            {params.message}
          </p>
        )}

        <form className="space-y-3">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm text-emerald-900/70">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded-lg border border-emerald-900/15 px-3 py-2 text-sm text-emerald-950 outline-none focus:border-emerald-700"
            />
          </div>
          <div>
            <label htmlFor="password" className="mb-1 block text-sm text-emerald-900/70">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={6}
              className="w-full rounded-lg border border-emerald-900/15 px-3 py-2 text-sm text-emerald-950 outline-none focus:border-emerald-700"
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              formAction={signIn}
              className="flex-1 rounded-lg bg-emerald-800 px-3 py-2 text-sm font-medium text-white transition hover:bg-emerald-900"
            >
              Sign in
            </button>
            <button
              formAction={signUp}
              className="flex-1 rounded-lg border border-emerald-900/20 px-3 py-2 text-sm font-medium text-emerald-900 transition hover:border-emerald-700"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
