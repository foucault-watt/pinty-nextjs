import { createClient } from "@/utils/supabase/server";

export default async function kegsAdminPage() {
  const supabase = await createClient();

  // On récupère tous les futs
  const { data: kegs, error: kegError } = await supabase
    .from("keg")
    .select("*")
    .order("created_at", { ascending: false });

  // On réc
  const { data: beers, error: beerError } = await supabase
    .from("beer")
    .select("id, name");

  if (kegError)
    return (
      <div className="text-error">
        Erreur lors du chargement des fûts : {kegError.message}
      </div>
    );

  if (beerError)
    return (
      <div className="text-error">
        Erreur lors du chargement des bières : {beerError.message}
      </div>
    ); 

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-hover w-full">
        <thead>
          <tr>
            <th>Bière</th>
            <th>Email</th>
            <th>Rôle Admin</th>
          </tr>
        </thead>
        <tbody>
          {kegs.map((keg) => (
            <tr key={keg.id}>
              <td>{keg.beer}</td>
              <td>{keg.email}</td>
              <td>
                {keg.is_admin ? (
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
