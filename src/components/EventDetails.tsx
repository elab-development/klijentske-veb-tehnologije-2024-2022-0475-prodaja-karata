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
    <div className="event-details-card">
      <img src={event.image || "/images/placeholder.png"} alt={event.name} />
      <h1>{event.name}</h1>
      <p>{event.description}</p>

      <div className="event-info">
        {event.date && (
          <p>
            <strong>Datum:</strong> {event.date}
          </p>
        )}
        {event.time && (
          <p>
            <strong>Vreme:</strong> {event.time}
          </p>
        )}
        {event.location && (
          <p>
            <strong>Lokacija:</strong> {event.location}
          </p>
        )}
        {event.price !== undefined && (
          <p>
            <strong>Cena karte:</strong> {event.price} RSD
          </p>
        )}
      </div>

      <button onClick={() => onAdd(event.id)}>Dodaj u korpu</button>
    </div>
  );
};

export default EventDetails;
