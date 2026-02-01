import { createClient } from "@/utils/supabase/server";

export default async function AdminPage() {
  const supabase = await createClient();

  // On récupère tous les profils
  const { data: users, error: usersError } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  const {data: beers, error: beersError } = await supabase
    .from("beer")
    .select("*")
    .order("created_at", { ascending: false });

  if (usersError || beersError) {
    console.error("Error loading data:", usersError || beersError);
    return <div className="text-error">Erreur lors du chargement des données</div>;
  }

  console.log("users", users);

  if (!users)
    return (
      <div className="text-error">
        Erreur lors du chargement des utilisateurs
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <h1 className="text-2xl font-bold mb-4">Tableau de bord Admin</h1>
      <h2 className="text-xl">Vous avez {users.length} utilisateurs</h2>
      <h2 className="text-xl">Vous avez {beers.length} bières</h2>
    </div>
  );
}
