import { createClient } from "@/utils/supabase/server";

// --- Types pour TypeScript ---
type PourHistory = {
  id: string;
  created_at: string;
  volume_ml: number;
  duration_seconds: number | null;
  device_id: string | null;
  keg: {
    id: string;
    beer: {
      name: string;
    } | null;
  } | null;
};

// --- Composant Principal ---
export default async function HistoryPage() {
  const supabase = await createClient();

  // On récupère l'historique avec les jointures sur le fût (keg) et la bière (beer)
  const { data: history, error: historyError } = await supabase
    .from("pour_history")
    .select(`
      id,
      created_at,
      volume_ml,
      duration_seconds,
      device_id,
      keg:keg_id (
        id,
        beer:beer_id (
          name
        )
      )
    `)
    .order("created_at", { ascending: false })
    .limit(50) as { data: PourHistory[] | null, error: any };

  // Gestion des erreurs de chargement
  if (historyError) {
    console.error("Error loading history:", historyError);
    return (
      <div className="p-10 text-center">
        <div className="alert alert-error shadow-lg">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d=" humanitarian 10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>Erreur lors du chargement de l'historique : {historyError.message}</span>
          </div>
        </div>
      </div>
    );
  }

  // --- Helper pour le formattage de date ---
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header de la page */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">Historique Pinty 🍺</h1>
          <p className="text-sm text-gray-500 mt-1 italic">Suivi des tirages en temps réel (via MQTT)</p>
        </div>
        <div className="stats shadow bg-base-200">
          <div className="stat py-2 px-4">
            <div className="stat-title text-xs">Total Sessions</div>
            <div className="stat-value text-primary text-2xl">{history?.length || 0}</div>
          </div>
        </div>
      </div>

      <div className="divider"></div>

      {/* Tableau des données */}
      <div className="card bg-base-100 shadow-xl border border-base-200">
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            {/* Header du tableau */}
            <thead>
              <tr className="bg-base-200">
                <th className="rounded-tl-lg">Date</th>
                <th>Produit / Bière</th>
                <th>Quantité</th>
                <th>Durée</th>
                <th className="rounded-tr-lg">Source (ESP32)</th>
              </tr>
            </thead>

            {/* Corps du tableau */}
            <tbody>
              {history && history.length > 0 ? (
                history.map((item) => (
                  <tr key={item.id} className="hover transition-colors">
                    <td className="text-xs font-mono opacity-70">
                      {formatDate(item.created_at)}
                    </td>
                    <td>
                      <div className="flex flex-col">
                        <span className="font-bold text-base">
                          {item.keg?.beer?.name || "Bière Inconnue"}
                        </span>
                        <span className="text-[10px] opacity-40 font-mono">
                          ID: {item.keg?.id.split("-")[0]}...
                        </span>
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-2">
                        {/* Couleur dynamique selon le volume */}
                        <div className={`badge badge-sm ${item.volume_ml > 400 ? 'badge-secondary' : 'badge-ghost'}`}>
                          {item.volume_ml} ml
                        </div>
                        <progress 
                            className={`progress w-16 ${item.volume_ml > 400 ? 'progress-secondary' : 'progress-primary'}`} 
                            value={item.volume_ml} 
                            max="600">
                        </progress>
                      </div>
                    </td>
                    <td>
                      <span className="text-sm">
                        {item.duration_seconds ? `${item.duration_seconds.toFixed(1)}s` : "--"}
                      </span>
                    </td>
                    <td>
                      <div className="badge badge-outline badge-xs opacity-60">
                        {item.device_id || "Inconnu"}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-16">
                    <div className="flex flex-col items-center opacity-30">
                      <span className="text-5xl">📭</span>
                      <p className="mt-2">Aucun tirage enregistré sur le broker.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Footer Info */}
      <div className="text-center text-xs opacity-40">
        Les données sont synchronisées automatiquement via le Webhook HiveMQ.
      </div>
    </div>
  );
}