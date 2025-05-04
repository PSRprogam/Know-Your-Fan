import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import styles from "./dashboard.module.css";

export default function Dashboard() {
  const navigate = useNavigate();
  const [, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAccess = () => {
    navigate("/home");
  };

  return (
    <div className={styles.homeContainer}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h1 className={styles.title}>BEM-VINDO À FURIA FAN ZONE</h1>
        <p className={styles.subtitle}>
          Acesse sua conta, acompanhe campeonatos, interaja com a comunidade.
        </p>
        <button className={styles.accessButton} onClick={handleAccess}>
          Acessar Área do Fã
        </button>
      </div>
    </div>
  );
}
