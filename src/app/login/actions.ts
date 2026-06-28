"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function getSafeString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function signInWithEmail(formData: FormData) {
  const email = getSafeString(formData.get("email")).toLowerCase();
  const password = getSafeString(formData.get("password"));

  if (!email || !password) {
    redirect("/login?error=Email%20and%20password%20are%20required.");
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    const encodedMessage = encodeURIComponent(error.message);
    redirect(`/login?error=${encodedMessage}`);
  }

  // On success, redirect to home or intended page
  redirect("/");
}
