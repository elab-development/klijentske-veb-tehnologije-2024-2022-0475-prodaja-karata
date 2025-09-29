import React from "react";

const Kontakt: React.FC = () => {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Kontaktirajte nas</h1>
      <p>Email: support@karte.rs</p>
      <p>Telefon: 061 172 00 91</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          alert("Poruka je poslata!");
        }}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          marginTop: "2rem",
          maxWidth: "400px",
        }}
      >
        <input type="text" placeholder="Vaše ime" required />
        <input type="email" placeholder="Vaš email" required />
        <textarea placeholder="Vaša poruka" required />
        <button type="submit">Pošalji</button>
      </form>
    </div>
  );
};

export default Kontakt;
