import { createClient } from "@/utils/supabase/server";
import { Barrel, Beer, Gauge, Link2, Store, Users } from "lucide-react";
import Image from "next/image";
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
    <div className="">
      <aside className="h-screen sticky top-0 overflow-y-auto w-60 py-6 px-4 bg-base-200 block  float-left">
        <a className="btn py-7 btn-ghost">
          <Image
            alt="Logo"
            src="/logo.webp"
            width={38}
            height={38}
            className="rounded-xl mr-2"
          />
          Dashbord Admin
        </a>

        <ul className="menu px-0 flex">
          <li className="menu-title">Statistiques</li>
          <li>
            <Link className="pr-26" href="/admin">
              <Gauge size={16} />
              Dashboard
            </Link>
          </li>
          <li>
            <Link className="pr-26" href="/admin/connection">
              <Link2 size={16} />
              Connexions
            </Link>
          </li>
          <li className="menu-title">Gestions</li>
          <li>
            <Link href="/admin/users">
              <Users size={16} />
              Utilisateurs
            </Link>
          </li>
          <li>
            <Link href="/admin/beers">
              <Beer size={16} />
              Bières
            </Link>
          </li>
          <li>
            <Link href="/admin/kegs">
              <Barrel size={16} />
              Futs
            </Link>
          </li>
          <li>
            <Link href="/admin/bars">
              <Store size={16} />
              Bars
            </Link>
          </li>
        </ul>
      </aside>
      <main className="ml-60 p-4">{children}</main>
    </div>
  );
}
