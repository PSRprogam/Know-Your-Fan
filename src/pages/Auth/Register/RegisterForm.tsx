/**
 * @file RegisterForm.jsx
 * @description Componente de formulário de registro para novos usuários na aplicação "Know Your Fan". 
 * Permite que o usuário se cadastre fornecendo nome, e-mail e senha, com validação para garantir que 
 * as senhas coincidam. O formulário também oferece a funcionalidade de mostrar/esconder as senhas inseridas. 
 * Após o registro bem-sucedido, o usuário é redirecionado para a área do fã e seus dados são salvos no Firestore.
 * 
 * O formulário contém os seguintes campos:
 * - Nome Completo: o usuário insere seu nome completo.
 * - E-mail: o usuário insere seu e-mail, utilizado para criar a conta.
 * - Senha: o usuário define a senha de acesso à conta.
 * - Confirmar Senha: o usuário confirma a senha inserida.
 *
 * O processo de registro realiza:
 * - Criação do usuário no Firebase Authentication.
 * - Atualização do perfil do usuário com o nome inserido.
 * - Armazenamento dos dados do usuário no Firestore.
 *
 * @component
 * @returns {JSX.Element} Formulário de registro com campos para nome, e-mail, senha e confirmação de senha, 
 * além de links para login caso o usuário já tenha uma conta.
 *
 * @example
 * // Uso do componente de registro:
 * <RegisterForm />
 *
 * @dependencies
 * - React (useState): Para gerenciar os estados dos campos do formulário e mensagens de erro.
 * - react-router-dom (useNavigate, Link): Para navegação entre páginas após o registro e link para login.
 * - firebase/authService (doCreateUserWithEmailAndPassword, updateUserProfile): Para criar usuários e atualizar seus perfis.
 * - firebase/firestore (doc, setDoc): Para armazenar dados do usuário no Firestore.
 * - lucide-react (Eye, EyeOff, Key, Mail, User): Para ícones utilizados no formulário.
 * - CSS Modules para estilização do componente.
 *
 * @notes
 * - Durante o processo de registro, o botão de "Cadastrar" é desabilitado para evitar múltiplos cliques.
 * - Caso ocorra um erro durante o registro, uma mensagem de erro é exibida informando ao usuário.
 * - O formulário inclui validação para garantir que as senhas inseridas coincidam.
 */


import { useState } from "react";
import { Eye, EyeOff, Key, Mail, User } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import styles from "./register.module.css";

import {
  doCreateUserWithEmailAndPassword,
  updateUserProfile,
} from "../../../firebase/authService";
import { db } from "../../../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem.");
      return;
    }

    if (!isRegistering) {
      setIsRegistering(true);
      try {
        const userCredential = await doCreateUserWithEmailAndPassword(
          email,
          password
        );

        await updateUserProfile(userCredential.user, { displayName: name });

        const userDocRef = doc(db, "usuarios", userCredential.user.uid);
        await setDoc(userDocRef, {
          uid: userCredential.user.uid,
          nome: name,
          email: email,
        });

        navigate("/area-do-fa");
      } catch (error) {
        console.error(error);
        setErrorMessage("Erro ao registrar. Tente novamente.");
      } finally {
        setIsRegistering(false);
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {errorMessage && (
        <p style={{ color: "red", textAlign: "center" }}>{errorMessage}</p>
      )}
      <div className={styles.group}>
        <label className={styles.label} >Nome Completo *</label>
        <div className={styles.wrapper}>
          <User className={styles.icon} />
          <input
            placeholder="João Pedro"
            className={styles.input}
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
      </div>

      <div className={styles.group}>
        <label className={styles.label}>E-mail *</label>
        <div className={styles.wrapper}>
          <Mail className={styles.icon} />
          <input
            type="email"
            placeholder="exemplo@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
            required
          />
        </div>
      </div>

      <div className={`${styles.group} ${styles.passwordWrapper}`}>
        <label className={styles.label}>Senha *</label>
        <div className={styles.wrapper}>
          <Key className={styles.icon} />
          <input
            placeholder="*******"
            className={styles.input}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
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

      <div className={`${styles.group} ${styles.passwordWrapper}`}>
        <label className={styles.label} >Confirmar Senha *</label>
        <div className={styles.wrapper}>
          <Key className={styles.icon} />
          <input className={styles.input}
            placeholder="*******"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          ></input>
          <button
            type="button"
            className={styles.togglePassword}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>


      <div className={styles.buttonContainer}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isRegistering}
        >
          {isRegistering ? "Cadastrando..." : "Cadastrar"}
        </button>
      </div>

      <div className={styles.loginFooter}>
        <span>Já sou um Furioso!</span>
        <Link to="/login" className={styles.loginLink}>
          Faça login
        </Link>
      </div>
    </form>
  );
}
