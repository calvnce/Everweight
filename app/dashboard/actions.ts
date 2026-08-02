"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function addEntry(formData: FormData) {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();
	if (!user) return;

	const weight = Number(formData.get("weight"));
	const unit = formData.get("unit") as string;
	const logged_on =
		(formData.get("logged_on") as string) ||
		new Date().toISOString().slice(0, 10);
	const note = (formData.get("note") as string)?.trim() || null;

	if (!weight || Number.isNaN(weight)) return;

	await supabase.from("weight_entries").insert({
		user_id: user.id,
		weight,
		unit,
		logged_on,
		note,
	});

	revalidatePath("/dashboard");
}

export async function deleteEntry(id: string) {
	const supabase = await createClient();
	await supabase.from("weight_entries").delete().eq("id", id);
	revalidatePath("/dashboard");
}
