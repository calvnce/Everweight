import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function LandingPage() {
	const supabase = await createClient();
	const {
		data: { user },
	} = await supabase.auth.getUser();

	return (
		<main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 text-center">
			<h1 className="mb-3 text-3xl font-semibold text-foreground">
				Everweight
			</h1>
			<p className="mb-8 max-w-md text-muted">
				A simple, private place to log your weight over time. Sign up,
				log a few entries, and watch the trend — everything here is
				scoped to your own account.
			</p>
			<Link
				href={user ? "/dashboard" : "/login"}
				className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
			>
				{user ? "Go to your dashboard" : "Sign in / Sign up"}
			</Link>
		</main>
	);
}
