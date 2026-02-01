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
      <table className="table table-zebra table-hover w-full">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Email</th>
            <th>Rôle Admin</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.full_name}</td>
              <td>{user.email}</td>
              <td>
                {user.is_admin ? (
                  <span className="badge badge-success">Admin</span>
                ) : (
                  <span className="badge badge-neutral">User</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
