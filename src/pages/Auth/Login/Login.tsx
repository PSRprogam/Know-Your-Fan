/**
 * @file Login.jsx
 * @description Componente de login da aplicação "Know Your Fan". Este componente permite que o usuário 
 * faça login utilizando e-mail e senha. Inclui funcionalidade para exibir/esconder a senha e redirecionamento 
 * para a área do fã após autenticação bem-sucedida. Em caso de erro de autenticação, é exibido um alerta.
 * 
 * O formulário contém os seguintes elementos:
 * - Campo de e-mail: o usuário insere seu e-mail para login.
 * - Campo de senha: o usuário insere sua senha com a possibilidade de alternar a visibilidade da senha.
 * - Botão de login: ao ser clicado, tenta autenticar o usuário.
 * - Links para recuperação de senha e para página de registro.
 *
 * @component
 * @returns {JSX.Element} Formulário de login com campos para e-mail, senha e links para ações adicionais (esqueci a senha, registro).
 *
 * @example
 * // Uso dentro de um layout de login:
 * <Login />
 *
 * @dependencies
 * - React (useState): Para gerenciar estados como e-mail, senha e visibilidade da senha.
 * - react-router-dom (useNavigate): Para navegação entre páginas após autenticação bem-sucedida.
 * - firebase/auth (signInWithEmailAndPassword): Para autenticação de usuário com Firebase.
 * - lucide-react (Eye, EyeOff, Key, LogIn, Mail): Para ícones utilizados nos campos de entrada e botão de login.
 * - CSS Modules para estilização do componente.
 *
 * @notes
 * - O estado de loading é utilizado para desabilitar o botão de login durante o processo de autenticação.
 * - O erro de autenticação exibe um alerta com a mensagem "E-mail ou senha incorretos." caso o login falhe.
 */


import { useState } from "react";
import { Eye, EyeOff, Key, LogIn, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebaseConfig";
import styles from "./login.module.css";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      setLoading(true)
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/area-do-fa");
    } catch (error) {
      console.log(error)
      alert("E-mail ou senha incorretos.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img className={styles.img}src="./images/default-avatar.png" alt="logo-furia" />
        <h1 className={styles.title}>LOGIN</h1>
        <p className={styles.subtitle}>
          Entre na sua conta para acessar
        </p>
        <div className={styles.group}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <div className={styles.wrapper}>
            <Mail className={styles.icon} />
            <input
              type="email"
              placeholder="E-mail"
              className={styles.input}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className={styles.group}>
          <label htmlFor="password" className={styles.label}>Senha</label>
          <div className={styles.wrapper}>
            <Key className={styles.icon} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Senha"
              className={styles.input}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles.togglePassword}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <button className={styles.button} onClick={handleLogin} disabled={loading}>
          <LogIn className="button-icon" />
        </button>

        <div className={styles.linkContainer}>
          <a href="/esqueceu-senha">Esqueceu a senha?</a>
          <a href="/register">Não tem uma conta? Torna-se um Furioso</a>
        </div>
      </div>
    </div>
  );
}
