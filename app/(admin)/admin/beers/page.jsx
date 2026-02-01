import { createClient } from "@/utils/supabase/server";
import { hasFlag } from "country-flag-icons";
import Image from "next/image";

export default async function AdminPage() {
  const supabase = await createClient();

  // On récupère toutes les bières
  const { data: beers, error: beersError } = await supabase
    .from("beer")
    .select("*")
    .order("created_at", { ascending: false });

  if (beersError)
    return (
      <div className="text-error">Erreur lors du chargement des bières</div>
    );

  const Type = ({ type }) => {
    switch (type) {
      case "blond":
        return <span className="badge badge-primary">Blonde</span>;
      case "red":
        return <span className="badge badge-secondary">Rouge</span>;
      default:
        return <span className="badge badge-info">Autre</span>;
    }
  };

  const Flag = ({ country }) => {
    if (!country) return null;
    const cc = country.toUpperCase();
    if (!hasFlag(cc)) return null;

      return (
    <Image
      src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${cc}.svg`}
      alt={cc}
      className="rounded"
        width={32}
        height={24}
      title={cc}
    />
  );    
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra table-hover w-full">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Type</th>
            <th>{"Degré d'alcool"}</th>
            <th>Pays</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {beers.map((beer) => (
            <tr key={beer.id}>
              <td>{beer.name}</td>
              <td>
                <Type type={beer.type} />
              </td>
              <td>{beer.alcohol}</td>
              <td>
                <Flag country={beer.country} />
              </td>
              <td>{beer.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
