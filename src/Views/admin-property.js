import { useParams } from "react-router-dom";

export function AdminProperty() {
  const { id } = useParams();
  return (
    <div>
      <p>Admin Property</p>
    </div>
  );
}
