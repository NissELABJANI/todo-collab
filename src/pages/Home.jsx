// src/pages/Home.jsx
import React from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/login");
  };

  return (
    <div>
      <h2>Bienvenue sur la page Home !</h2>
      <button onClick={handleLogout}>Se déconnecter</button>
    </div>
  );
};

export default Home;
