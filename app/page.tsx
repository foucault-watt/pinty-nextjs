import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
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
    </div>
  );
}
