import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem",
        background: "#eee", // fond clair
        color: "#111", // texte noir
      }}
    >
      <div style={{ display: "flex", gap: "1rem" }}>
        <Link to="/home" style={{ color: "#111", textDecoration: "none", fontWeight: "500" }}>
          Accueil
        </Link>
        {user && (
          <Link to="/tasks" style={{ color: "#111", textDecoration: "none", fontWeight: "500" }}>
            Mes tâches
          </Link>
        )}
      </div>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {!user ? (
          <>
            <Link to="/login" style={{ color: "#111", textDecoration: "none" }}>
              Connexion
            </Link>
            <Link to="/register" style={{ color: "#111", textDecoration: "none" }}>
              Inscription
            </Link>
          </>
        ) : (
          <>
            <span style={{ fontWeight: "bold", color: "#111" }}>{user.email}</span>
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "#3b82f6",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Déconnexion
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
