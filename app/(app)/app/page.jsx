import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function appIndex() {
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  const { data: ref_profiles_bar, error: refProfilesBarError } = await supabase
    .from("ref_profiles_bar")
    .select("bar_id")
    .maybeSingle();

  if (refProfilesBarError) {
    console.error("Error loading data:", refProfilesBarError);
    return <div className="text-error">Erreur lors du chargement des données d&apos;utilisateurs</div>;
  }

  if (ref_profiles_bar === null) {
    redirect("/");
  }

  redirect(`/app/${ref_profiles_bar.bar_id}`);

  }
