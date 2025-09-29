import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { Product } from "../models/product";

interface ProfileProps {
  cartProducts: Product[];
}

const Profile: React.FC<ProfileProps> = ({ cartProducts }) => {
  const { isLoggedIn, logout, userName, userEmail } = useAuth();

  if (!isLoggedIn) {
    return (
      <div className="p-6 text-center">
        <h1 className="text-3xl font-bold mb-4">Profil</h1>
        <p className="text-red-600 mb-2">Niste ulogovani.</p>
        <p className="text-gray-700">
          Molimo prijavite se da biste videli svoj profil.
        </p>
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

      <div className="mb-6">
        <h2>Moje karte / proizvodi</h2>
        {cartProducts.length === 0 ? (
          <p>Trenutno nemate kupljenih proizvoda.</p>
        ) : (
          <ul>
            {cartProducts.map((product) => (
              <li key={product.id}>
                {product.name} - {product.amount}{" "}
                {product.amount === 1 ? "karta" : "karte"}
              </li>
            ))}
          </ul>
        )}
      </div>

      <button onClick={logout} className="profile-logout-btn">
        Logout
      </button>
    </div>
  );
};

export default Profile;
