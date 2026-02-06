import roleType from "@/components/beer/roleType";
import { createClient } from "@/utils/supabase/server";

export default async function usersAdminPage({
  params,
}: {
  params: Promise<{ barId: string }>;
}) {
  const { barId } = await params;
  const supabase = await createClient();

  // 1. UNE SEULE requête qui fait la jointure
  // On demande le profil + les infos de la table de liaison filtrées sur ce bar
  const { data: users, error } = await supabase
    .from("profiles")
    .select(`
      id,
      full_name,
      email,
      ref_profiles_bar!inner (
        role,
        bar_id
      )
    `)
    .eq("ref_profiles_bar.bar_id", barId); // On ne veut que les gens de CE bar

  if (error) return <div className="text-error">Erreur : {error.message}</div>;

  return (
    <div className="overflow-x-auto p-4">
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user) => (
            <tr key={user.id}>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>
                {roleType({ type: user.ref_profiles_bar[0]?.role || "undefined" })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}