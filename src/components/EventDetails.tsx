import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../models/product";

interface EventDetailsProps {
  onAdd: (id: number) => void;
}

const EventDetails: React.FC<EventDetailsProps> = ({ onAdd }) => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("/productsData.json")
      .then((res) => res.json())
      .then((data: { products: Product[] }) => {
        const foundEvent = data.products.find((p) => p.id === Number(id));
        setEvent(foundEvent || null);
      })
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <h2 className="text-center text-xl font-semibold mt-10">Učitavanje...</h2>
    );
  }

  if (!event) {
    return (
      <h2 className="text-center text-xl font-semibold mt-10">
        Dogadjaj nije pronađen
      </h2>
    );
  }

  return (
    <div className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-lg">
      <img
        src={event.image || "/images/placeholder.png"}
        alt={event.name}
        className="w-full max-h-80 object-contain rounded"
      />
      <h1 className="text-2xl font-bold mt-4">{event.name}</h1>
      <p className="mt-2 text-gray-700">{event.description}</p>

      <button
        onClick={() => onAdd(event.id)}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Dodaj u korpu
      </button>
    </div>
  );
};

export default EventDetails;
