import { createClient } from "@/utils/supabase/server";

export default async function appPage() {
  const supabase = await createClient();

  const { data: kegs, error: kegError } = await supabase
    .from("keg")
    .select("*");

    if (kegError) {
      return <div className="text-error">Erreur lors du chargement des fûts : {kegError.message}</div>;
    }

    type Keg = { status: string };
    const kegCountStatus = (kegs: Keg[] | null | undefined, status: string) => {
      if (!kegs) return 0;
      const count = kegs.filter(keg => keg.status === status).length;
      return (count);
    }

  return (
    <div className="overflow-x-auto">
      <h1>Dashboard</h1>
      <h2>Vous avez {kegCountStatus(kegs, "in_use")} fûts en cours d&apos;utilisation.</h2>
      <h2>Vous avez {kegCountStatus(kegs, "available")} fûts disponibles.</h2>
      <h2>Vous avez {kegCountStatus(kegs, "empty")} fûts vides.</h2>
    </div>
  );
}
