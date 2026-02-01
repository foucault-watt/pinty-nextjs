import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  // 1) Vérifie session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // 2) Charge le profil (table public)
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .single();
  console.log("Profil utilisateur:", profile);

  // Si pas de profil ou erreur -> refuse
  if (error || !profile) {
    redirect("/forbidden");
  }

  // 3) Check admin
  const isAdmin = profile.is_admin === true;
  if (!isAdmin) {
    redirect("/forbidden");
  }

  // 4) OK -> rend l'admin
  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="navbar bg-base-100 shadow-sm border-4 border-base-200 rounded-box mb-4">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost text-xl">
            Pinty
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/admin/" className="block">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="block">
                Utilisateurs
              </Link>
            </li>
            <li>
              <details>
                <summary>Bars</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li>
                    <a>Bar 1</a>
                  </li>
                  <li>
                    <a>Bar 2</a>
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
