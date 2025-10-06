import { FiShoppingCart } from "react-icons/fi";
import { Outlet, Link } from "react-router-dom";
import { CgProfile } from "react-icons/cg";
import { useAuth } from "../contexts/AuthContext";

interface NavBarProps {
  cartNum: number;
}

const NavBar: React.FC<NavBarProps> = ({ cartNum }) => {
  const { isLoggedIn } = useAuth();
  return (
    <>
      <div
        className="navBar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 20px",
        }}
      >

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Link to="/">
            <img
              src="/images/logo.png"
              alt="Logo sajta"
              style={{ height: "75px", width: "auto", cursor: "pointer" }}
            />
          </Link>
          <Link to="/cart">
            <div
              className="cart-items"
              style={{ display: "flex", alignItems: "center" }}
            >
              <FiShoppingCart style={{ marginLeft: 5 }} />
              <p className="cart-num" style={{ marginLeft: 5 }}>
                {cartNum}
              </p>
            </div>
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <Link to="/profile" className="nav-profile">
            <CgProfile />
          </Link>
          <Link to="/login" className="nav-btn">
            Login
          </Link>
          <Link to="/register" className="nav-btn">
            Register
          </Link>
          <Link to="/kontakt" className="nav-btn">
            Kontakt
          </Link>
        </div>
      </div>

      <main className="bg-light-blue-custom">
        <Outlet />
      </main>

      <footer className="bg-blue-200 text-gray-300 py-2 px-6 mt-6">
        <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center">
          <div className="footer-left">
            <h2 className="text-lg font-semibold text-white">
              © 2025 Online prodaja karata
            </h2>
          </div>

          <div className="footer-middle flex gap-6 justify-center items-center">
            <span className="text-xs text-gray-800">Uslovi korišćenja</span>
            <span className="text-xs text-gray-800">Politika privatnosti</span>
          </div>

          <div className="footer-right flex flex-col gap-1 text-sm">
            <p className="m-0">Email: support@karte.rs</p>
            <p className="m-0">Telefon: 061 172 00 91</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default NavBar;
