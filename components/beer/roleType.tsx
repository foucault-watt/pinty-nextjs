  export default function roleType({ type }: { type: string }) {
    switch (type) {
      case "owner":
        return <span className="badge badge-primary">Gérant</span>;
      case "staff":
        return <span className="badge badge-secondary">Staffeur</span>;
      case "undefined":
         return <span className="badge badge-warning">Non défini</span>;
      default:
        return <span className="badge badge-info">Autre</span>;
    }
  };