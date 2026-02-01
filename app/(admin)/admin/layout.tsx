import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 1) Vérifie session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }


  // 2) Charge le profil (table public)
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();
  console.log("Profil utilisateur:", profile);

  // Si pas de profil ou erreur -> refuse
  if (error || !profile) {
    redirect("/forbidden");
  }

  // 3) Check admin
  const isAdmin = profile.is_admin === true;
  if (!isAdmin) {
    redirect("/forbidden");
  }

  // 4) OK -> rend l'admin
  return (
    <div style={{ padding: 24 }}>
      <div className="text-lg font-semibold mb-4 flex flex-col items-center">
        Interface Admin
      </div>
      {children}
    </div>
  );
}
