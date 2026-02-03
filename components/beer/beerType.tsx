  export default function beerType({ type }: { type: string }) {
    switch (type) {
      case "blond":
        return <span className="badge badge-primary">Blonde</span>;
      case "red":
        return <span className="badge badge-secondary">Rouge</span>;
      default:
        return <span className="badge badge-info">Autre</span>;
    }
  };