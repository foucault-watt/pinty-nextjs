export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full flex-col items-center py-32 px-16 ">
        <h1 className="text-5xl font-bold mb-8">
          Welcome to Pinty Next.js avec DaisyUI!
        </h1>
        <div className="card w-96 shadow-xl ">
          <div className="card-title text-primary-content p-4 rounded-t-2xl bg-primary">La biere</div>
          <div className="card-body bg-base-200 rounded-b-2xl">
            <p className="text-primary-content">
              La biere est une boisson alcoolisee obtenue par fermentation de
              cereales, principalement l&apos;orge, et aromatisee avec du
              houblon. Elle est consommee depuis des millenaires et existe sous
              de nombreuses formes et saveurs a travers le monde.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
