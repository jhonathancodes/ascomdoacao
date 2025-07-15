import React from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import logo from "../assets/logo.jpeg"; // Importa a imagem

export default function Navbar() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate("/login");
        } catch (e) {
            console.error("Erro ao fazer logout:", e);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <img src={logo} alt="Logo Doe Fácil" className="navbar-logo" />
                <span>Doe Fácil</span>
            </div>
            <button onClick={handleLogout} className="logout-button">Sair</button>
        </nav>
    );
}
