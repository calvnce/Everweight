import { createClient } from "@/lib/supabase/server";
import { signOut } from "../login/actions";
import { addEntry } from "./actions";
import EntryRow from "@/components/EntryRow";
import WeightChart from "@/components/WeightChart";

function formatDelta(delta: number | null) {
	if (delta === null) return "—";
	const sign = delta > 0 ? "+" : "";
	return `${sign}${delta.toFixed(1)}`;
}

export default async function DashboardPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: entriesAsc } = await supabase
		.from("weight_entries")
		.select("*")
		.order("logged_on", { ascending: true });

	const entries = entriesAsc ?? [];
	const latest = entries.at(-1);
	const first = entries[0];
	const delta = latest && first ? latest.weight - first.weight : null;
	const deltaLabel = formatDelta(delta);
	const entriesDesc = [...entries].reverse();

	return (
		<main className="min-h-screen bg-background px-4 py-10">
			<div className="mx-auto max-w-xl">
				<div className="mb-8 flex items-center justify-between">
					<div>
						<h1 className="text-xl font-semibold text-foreground">
							Everweight
						</h1>
						<p className="text-sm text-muted">{user?.email}</p>
					</div>
					<form action={signOut}>
						<button className="text-sm text-muted underline-offset-4 hover:text-foreground hover:underline">
							Sign out
						</button>
					</form>
				</div>

				<div className="mb-6 grid grid-cols-3 gap-3">
					<div className="rounded-xl border border-border bg-surface p-4">
						<p className="text-xs text-muted">Latest</p>
						<p className="text-lg font-semibold text-accent">
							{latest ? `${latest.weight} ${latest.unit}` : "—"}
						</p>
					</div>
					<div className="rounded-xl border border-border bg-surface p-4">
						<p className="text-xs text-muted">Change</p>
						<p className="text-lg font-semibold text-foreground">
							{deltaLabel}
						</p>
					</div>
					<div className="rounded-xl border border-border bg-surface p-4">
						<p className="text-xs text-muted">Entries</p>
						<p className="text-lg font-semibold text-foreground">
							{entries.length}
						</p>
					</div>
				</div>

				{entries.length > 1 && (
					<div className="mb-6 rounded-xl border border-border bg-surface p-4">
						<WeightChart entries={entries} />
					</div>
				)}

				<form
					action={addEntry}
					className="mb-6 grid grid-cols-2 gap-2 rounded-xl border border-border bg-surface p-4"
				>
					<input
						name="weight"
						type="number"
						step="0.1"
						placeholder="Weight"
						required
						className="rounded-lg border border-border px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
					/>
					<select
						name="unit"
						defaultValue="kg"
						className="rounded-lg border border-border px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
					>
						<option value="kg">kg</option>
						<option value="lb">lb</option>
					</select>
					<input
						name="logged_on"
						type="date"
						defaultValue={new Date().toISOString().slice(0, 10)}
						className="rounded-lg border border-border px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
					/>
					<input
						name="note"
						placeholder="Note (optional)"
						className="rounded-lg border border-border px-3 py-2 text-sm text-foreground outline-none focus:border-primary"
					/>
					<button className="col-span-2 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover">
						Log weigh-in
					</button>
				</form>

				<ul className="space-y-2">
					{entriesDesc.map((entry) => (
						<EntryRow
							key={entry.id}
							id={entry.id}
							weight={entry.weight}
							unit={entry.unit}
							loggedOn={entry.logged_on}
							note={entry.note}
						/>
					))}
					{entries.length === 0 && (
						<li className="rounded-xl border border-dashed border-border px-3 py-8 text-center text-sm text-muted">
							No entries yet, log your first weigh-in above.
						</li>
					)}
				</ul>
			</div>
		</main>
	);
}
