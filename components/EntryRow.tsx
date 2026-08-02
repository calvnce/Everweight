"use client";

import { useTransition } from "react";
import { deleteEntry } from "@/app/dashboard/actions";

export default function EntryRow({
	id,
	weight,
	unit,
	loggedOn,
	note,
}: Readonly<{
	id: string;
	weight: number;
	unit: string;
	loggedOn: string;
	note: string | null;
}>) {
	const [isPending, startTransition] = useTransition();

	return (
		<li className="flex items-center gap-3 rounded-xl border border-border bg-surface px-4 py-3">
			<div className="flex-1">
				<p className="text-sm font-medium text-foreground">
					{weight} {unit}
					<span className="ml-2 text-xs font-normal text-muted">
						{loggedOn}
					</span>
				</p>
				{note && <p className="text-xs text-muted">{note}</p>}
			</div>
			<button
				disabled={isPending}
				onClick={() => startTransition(() => deleteEntry(id))}
				className="text-xs text-muted hover:text-danger"
			>
				Delete
			</button>
		</li>
	);
}
