import React from "react";

const Kontakt: React.FC = () => {
  return (
    <div className="kontakt-container">
      <h1 className="kontakt-title">Kontaktirajte nas</h1>
      <p className="kontakt-info">Email: support@karte.rs</p>
      <p className="kontakt-info">Telefon: 061 172 00 91</p>

      <form
        className="kontakt-form"
        onSubmit={(e) => {
          e.preventDefault();
          alert("Poruka je poslata!");
        }}
      >
        <input
          type="text"
          placeholder="Vaše ime"
          required
          className="kontakt-input"
        />
        <input
          type="email"
          placeholder="Vaš email"
          required
          className="kontakt-input"
        />
        <textarea
          placeholder="Vaša poruka"
          required
          className="kontakt-textarea"
        />
        <button type="submit" className="kontakt-button">
          Pošalji
        </button>
      </form>
    </div>
  );
};

export default Kontakt;
