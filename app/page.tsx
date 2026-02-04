import { Facebook, Github, Linkedin, MessageCircle, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center flex-col">
      <main className="flex min-h-screen w-full flex-col items-center py-32 px-16 ">
        <h1 className="text-5xl font-bold mb-8">Bienvenue sur Pinty!</h1>
        <div className="flex flex-row gap-4">
          <Link href="/app" className="btn btn-primary">
            Accéder à l&apos;application
          </Link>
          <Link href="/admin" className="btn btn-secondary">
            Espace Admin
          </Link>
        </div>
      </main>
      <footer className="flex flex-col sm:flex-row gap-10 justify-between p-10 bg-base-200 w-full">
        <aside>
          <p className="text-3xl flex items-center gap-2">
            <Image
              alt="Logo"
              src="/logo.webp"
              width={38}
              height={38}
              className="inline rounded-xl"
            />
            Pinty
          </p>
          <small>Copyright © 2025 - Tous droits réservés</small>
        </aside>

        <div className="flex flex-col gap-4">
          <p className="text-2xl flex items-center gap-2">
            <MessageCircle />
            Contactez-moi
          </p>
          <span className="-mt-1">
          Dévellopé par Foucault WATTINNE
          </span>
          <nav className="flex gap-4">
            <Link href={"https://github.com/foucault-watt/pinty-nextjs"} target="_blank" className="btn btn-ghost btn-circle">
              <Github />
            </Link>
            <Link href={"https://facebook.com/fukowatt"} target="_blank" className="btn btn-ghost btn-circle">
              <Facebook />
            </Link>
            <Link href={"https://linkedin.com/in/foucault-wattinne"} target="_blank" className="btn btn-ghost btn-circle">
              <Linkedin />
            </Link>
            <Link href={"mailto:foucault.wattinne@gmail.com"} className="btn btn-ghost btn-circle">
              <Mail />
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
