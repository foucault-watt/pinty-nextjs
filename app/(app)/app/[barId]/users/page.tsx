import { createClient } from "@/utils/supabase/server";

export default async function usersAdminPage() {
  const supabase = await createClient();

  // On récupère tous les profils
  const { data: usersData, error: usersError } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: ref_profiles_barData, error: ref_profiles_barError } = await supabase
    .from("ref_profiles_bar")
    .select("*");

  if (usersError)
    return (
      <div className="text-error">
        Erreur lors du chargement des utilisateurs
      </div>
    );

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-hover w-full">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {usersData.map((userData) => (
            <tr key={userData.id}>
              <td>{userData.full_name}</td>
              <td>{userData.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
