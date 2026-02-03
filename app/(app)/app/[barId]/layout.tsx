import { createClient } from "@/utils/supabase/server";
import { Barrel, Beer, Gauge, Menu, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AppLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ barId: string }>;
}) {
  const { barId } = await params;
  const supabase = await createClient();

  // 1) Vérifie session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // Vérification que le [barId] appartient bien à l'utilisateur connecté
  const { data: bars, error: barsError } = await supabase
    .from("bar")
    .select("*")
    .eq("id", barId)
    .maybeSingle();

  console.log({ bars, barsError });

  if (barsError || !bars) {
    redirect("/forbidden");
  }

  // 2) OK -> rend l'app avec drawer
  return (
    <div className="drawer lg:drawer-open">
      {/* Input checkbox caché pour contrôler le drawer */}
      <input id="app-drawer" type="checkbox" className="drawer-toggle" />

      {/* Zone principale (contenu + bouton hamburger sur mobile) */}
      <div className="drawer-content flex flex-col">
        {/* Bouton hamburger visible uniquement sur mobile */}
        <div className="p-4 lg:hidden">
          <label
            htmlFor="app-drawer"
            className="btn btn-square btn-ghost drawer-button"
            aria-label="Ouvrir le menu"
          >
            <Menu size={24} />
          </label>
        </div>

        {/* Contenu de la page */}
        <main className="p-4">{children}</main>
      </div>

      {/* Sidebar (drawer-side) */}
      <div className="drawer-side">
        {/* Overlay pour fermer le drawer sur mobile */}
        <label
          htmlFor="app-drawer"
          aria-label="Fermer le menu"
          className="drawer-overlay"
        ></label>

        {/* Contenu de la sidebar */}
        <aside className="min-h-full w-60 bg-base-200 py-6 px-4">
          <a className="btn py-7 btn-ghost">
            <Image
              alt="Logo"
              src="/logo.webp"
              width={38}
              height={38}
              className="rounded-xl mr-2"
            />
            {bars.name}
          </a>

          <ul className="menu px-0 flex">
            <li className="menu-title">Statistiques</li>
            <li>
              <Link className="pr-26" href={`/app/${barId}`}>
                <Gauge size={16} />
                Dashboard
              </Link>
            </li>
            <li className="menu-title">Gestion du bar</li>
            <li>
              <Link href={`/app/${barId}/kegs`}>
                <Barrel size={16} />
                Futs
              </Link>
            </li>
            <li>
              <Link href={`/app/${barId}/beers`}>
                <Beer size={16} />
                Bières
              </Link>
            </li>
            <li className="menu-title">Configuration</li>
            <li>
              <Link href={`/app/${barId}/users`}>
                <Users size={16} />
                Membres
              </Link>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
}
