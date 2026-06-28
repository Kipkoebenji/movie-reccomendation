"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const MIN_PASSWORD_LENGTH = 8;

function getSafeString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

export async function signUpWithEmail(formData: FormData) {
  const email = getSafeString(formData.get("email")).toLowerCase();
  const password = getSafeString(formData.get("password"));

  if (!email || !password) {
    redirect("/signup?error=Email%20and%20password%20are%20required.");
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    redirect(
      "/signup?error=Password%20must%20be%20at%20least%208%20characters.",
    );
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    const encodedMessage = encodeURIComponent(error.message);
    redirect(`/signup?error=${encodedMessage}`);
  }

  redirect(
    "/signup?success=Account%20created.%20Check%20your%20email%20for%20verification%20if%20it%20is%20enabled.",
  );
}
