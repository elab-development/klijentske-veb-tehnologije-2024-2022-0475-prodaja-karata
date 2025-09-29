import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth(); // AuthContext
  const navigate = useNavigate(); // za redirect

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (email && password) {
      login();
      navigate("/");
    } else {
      alert("Molimo unesite email i password");
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
          >
            Login
          </button>
        </form>
        <p className="mt-2">
          Nemate nalog? <a href="/register">Registrujte se</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
