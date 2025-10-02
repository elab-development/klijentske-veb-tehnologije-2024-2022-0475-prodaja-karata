import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Product } from "../models/product";
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  WhatsappIcon,
  LinkedinIcon,
} from "react-share";

interface ProfileProps {
  cartProducts: Product[];
}

const Profile: React.FC<ProfileProps> = ({ cartProducts }) => {
  const { isLoggedIn, logout, userName, userEmail } = useAuth();
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});

  const handleRating = (eventId: number, rating: number) => {
    setRatings({ ...ratings, [eventId]: rating });
  };

  if (!isLoggedIn) {
    return (
      <div className="profile-not-logged">
        <h1 className="text-3xl font-bold mb-4">Profil</h1>
        <p>Niste ulogovani.</p>
        <p>Molimo prijavite se da biste videli svoj profil.</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <h1>Dobrodošli na vaš profil</h1>

      <div className="mb-6">
        <h2>Osnovni podaci</h2>
        <p>
          <span className="font-semibold">Ime:</span> {userName || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {userEmail || "N/A"}
        </p>
        <p>
          <span className="font-semibold">Korisnički ID:</span> 12345
        </p>
      </div>

      {/* Kupljeni proizvodi */}
      <div className="mb-6">
        <h2>Moje karte / proizvodi</h2>
        {cartProducts.length === 0 ? (
          <p>Trenutno nemate kupljenih proizvoda.</p>
        ) : (
          <ul>
            {cartProducts.map((product) => (
              <li key={product.id}>
                {product.name} ({product.date} {product.time}) –{" "}
                {product.amount} {product.amount === 1 ? "karta" : "karte"}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Događaji koji se mogu oceniti i podeliti */}
      <div className="mb-6">
        <h2>Moji događaji</h2>
        {cartProducts.length === 0 ? (
          <p>Nemate događaja za ocenjivanje.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {cartProducts.map((event) => (
              <div key={event.id} className="event-card">
                <img src={event.image} alt={event.name} />
                <h3>{event.name}</h3>
                <p>
                  {event.date} {event.time} – {event.location}
                </p>

                {/* Rating */}
                <div className="rating-stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <span
                      key={star}
                      onClick={() => handleRating(event.id, star)}
                      style={{
                        color:
                          ratings[event.id] && ratings[event.id] >= star
                            ? "gold"
                            : "gray",
                      }}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Share dugmići */}
                <div className="share-buttons">
                  <FacebookShareButton
                    url={`https://mojsajt.rs/events/${event.id}`}
                  >
                    <FacebookIcon size={32} round />
                  </FacebookShareButton>
                  <TwitterShareButton
                    url={`https://mojsajt.rs/events/${event.id}`}
                  >
                    <TwitterIcon size={32} round />
                  </TwitterShareButton>
                  <WhatsappShareButton
                    url={`https://mojsajt.rs/events/${event.id}`}
                  >
                    <WhatsappIcon size={32} round />
                  </WhatsappShareButton>
                  <LinkedinShareButton
                    url={`https://mojsajt.rs/events/${event.id}`}
                  >
                    <LinkedinIcon size={32} round />
                  </LinkedinShareButton>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={logout} className="profile-logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Profile;
