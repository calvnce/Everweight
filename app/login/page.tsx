import { signIn, signUp } from "./actions";

export default async function LoginPage({
	searchParams,
}: Readonly<{
	searchParams: Promise<{ error?: string; message?: string }>;
}>) {
	const params = await searchParams;

	return (
		<main className="flex min-h-screen items-center justify-center bg-background px-4">
			<div className="w-full max-w-sm rounded-2xl border border-border bg-surface p-8">
				<h1 className="mb-1 text-xl font-semibold text-foreground">
					Everweight
				</h1>
				<p className="mb-6 text-sm text-muted">
					Sign in to your account, or create one below.
				</p>

				{params.error && (
					<p className="mb-4 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">
						{params.error}
					</p>
				)}
				{params.message && (
					<p className="mb-4 rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
						{params.message}
					</p>
				)}

				<form className="space-y-3">
					<div>
						<label
							htmlFor="email"
							className="mb-1 block text-sm text-muted"
						>
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							required
							className="w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
						/>
					</div>
					<div>
						<label
							htmlFor="password"
							className="mb-1 block text-sm text-muted"
						>
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							required
							minLength={6}
							className="w-full rounded-lg border border-border px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
						/>
					</div>

					<div className="flex gap-2 pt-2">
						<button
							formAction={signIn}
							className="flex-1 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
						>
							Sign in
						</button>
						<button
							formAction={signUp}
							className="flex-1 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition hover:border-primary"
						>
							Sign up
						</button>
					</div>
				</form>
			</div>
		</main>
	);
}
