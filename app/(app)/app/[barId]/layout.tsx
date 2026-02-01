import { createClient } from "@/utils/supabase/server";
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
  const { data: bars, error : barsError } = await supabase
    .from("bar")
    .select("id")
    .eq("id", barId)
    .maybeSingle();

    console.log({bars, barsError});

    if (barsError || !bars) {
      redirect("/forbidden");
    }

  // 2) OK -> rend l'app
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="navbar bg-base-100 shadow-sm border-4 border-base-200 rounded-box mb-4">
        <div className="flex-1">
          <Link href="/app" className="btn btn-ghost text-xl">
            Pinty
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/app" className="block">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/app/users" className="block">
                Mes utilisateurs
              </Link>
            </li>
            <li>
              <Link href="/app/beers" className="block">
                Mes bières
              </Link>
            </li>
            <li>
              <Link href="/app/kegs" className="block">
                Mes fûts
              </Link>
            </li>
            <li>
              <details>
                <summary>Mes tireuses</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a>Tireuse 1</a>
                  </li>
                  <li>
                    <a>Tireuse 2</a>
                  </li>
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
}
