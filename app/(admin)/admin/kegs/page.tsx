import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function kegsAdminPage() {
  const supabase = await createClient();

  // On récupère tous les futs
  const { data: kegs, error: kegError } = await supabase
    .from("keg")
    .select("*")
    .order("created_at", { ascending: false });

  // On récupère toutes les bières pour afficher leur nom
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

    const kegStatus = (keg) => {
      if (keg.status === "empty") return "Vide";
      if (keg.status === "in_use") return "En cours d'utilisation";
      if (keg.status === "full") return "Plein";
      return "Inconnu";
    }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-hover w-full">
        <thead>
          <tr>
            <th>Bière</th>
            <th>Capacité (ml)</th>
            <th>Volume restant (ml)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {kegs.map((keg) => (
            <tr key={keg.id}>
              <td>
                <Link href={`/admin/beers/${keg.beer_id}`} className="link link-primary">
                  {beers.find((beer) => beer.id === keg.beer_id)?.name ||
                    "Inconnu"}
                </Link>
              </td>
              <td>{keg.capacity_ml}</td>
              <td>{keg.remaining_volume_ml}</td>
              <td>{kegStatus(keg)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
