import { createClient } from "@/utils/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  // On récupère tous les profils
  const { data: users, error } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  console.log("users", users);

  if (error)
    return (
      <div className="text-error">
        Erreur lors du chargement des utilisateurs
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord Admin</h1>
      <h2 className="text-xl">Vous avez {users.length} utilisateurs</h2>
    </div>
  );
}
