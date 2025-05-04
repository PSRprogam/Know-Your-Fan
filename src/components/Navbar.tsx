/**
 * @file Navbar.jsx
 * @description Componente de barra de navegação lateral responsiva. Inclui:
 * - Avatar e nome do usuário (via contexto de autenticação)
 * - Links de navegação com ícones
 * - Botão para expandir/recolher a navbar
 * - Responsividade automática (mobile/desktop)
 * 
 * @component
 * @requires react
 * @requires react-router-dom/Link
 * @requires lucide-react ícones
 * @requires AuthContext
 * 
 * @returns {JSX.Element} Elemento JSX contendo a estrutura da navbar.
 * 
 * @example
 * // Uso básico (sem props):
 * <Navbar />
 *
 * @example
 * // Uso com contexto de autenticação pré-configurado:
 * <AuthProvider>
 *   <Navbar />
 * </AuthProvider>
 * 
 * @state {boolean} isCollapsed - Controla se a navbar está recolhida ou expandida.
 * 
 * @context
 * - Utiliza `useAuth()` para obter `userName` e `userAvatar`.
 * 
 * @dependencies
 * - React (useState)
 * - react-router-dom (Link)
 * - lucide-react (Menu, Share2, SquarePen, Trophy, Upload, LogOut, House)
 * - AuthContext (useAuth)
 * - CSS Modules (navbar.module.css)
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Share2, SquarePen, Trophy, Upload, LogOut, House } from "lucide-react";
import styles from "./navbar.module.css";
import { useAuth } from "../contexts/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const [navbarVisible, setNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };

  return (
    <div className={styles.container}>
      <button className={styles.toggleMenuBtn} onClick={toggleNavbar}>
        <Menu />
      </button>

      <nav
        className={`${styles.navbar} ${navbarVisible ? styles.active : styles.hidden
          }`}
      >
        <div className={styles.navbarHeader}>
          <img src="./images/default-avatar.png" alt="logoFuria" className={styles.avatar} />
          <h2 className={styles.displayName}>
            {user?.displayName
              ? (() => {
                const parts = user.displayName.trim().split(" ");
                return `${parts[0]} ${parts[parts.length - 1]}`;
              })()
              : "Visitante"}
          </h2>
          <span className={styles.badge}>Silver</span>
        </div>
        <ul className={styles.navLinks}>
          <li className={styles.navItem}>
            <House />
            <Link to="/home">Home</Link>
          </li>
          <li className={styles.navItem}>
            <SquarePen className={styles.icon} />
            <Link to="/alterar-dados">Perfil</Link>
          </li>
          <li className={styles.navItem}>
            <Trophy className={styles.icon} />
            <Link to="/ponto">Ponto</Link>
          </li>
          <li className={styles.navItem}>
            <Share2 className={styles.icon} />
            <Link to="/redes-sociais">Redes Sociais</Link>
          </li>
          <li className={styles.navItem}>
            <Upload className={styles.icon} />
            <Link to="/upload">Upload</Link>
          </li>
        </ul>
        <Link to="/login" className={styles.logoutItem}>
          <LogOut className="icon-user" />
        </Link>
      </nav>
    </div>
  );
}