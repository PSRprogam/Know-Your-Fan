/**
 * @file AuthForm.jsx
 * @description Componente reutilizável de formulário de autenticação, que pode ser utilizado tanto para login quanto para registro de usuários. 
 * O comportamento do formulário é definido pelo tipo fornecido via a prop `type`, que pode ser "login" ou "register". 
 * Dependendo do tipo, o formulário realiza a autenticação ou o registro do usuário, utilizando os métodos do contexto de autenticação (`useAuth`).
 * 
 * Funcionalidades:
 * - Campo de e-mail: o usuário insere seu e-mail.
 * - Campo de senha: o usuário insere sua senha.
 * - Exibição de mensagem de erro: caso ocorra um erro durante o processo de autenticação ou registro, a mensagem é exibida.
 * - Navegação após autenticação: ao sucesso, o usuário é redirecionado para a página `/dashboard`.
 * 
 * @component
 * @param {Props} props
 * @param {("login" | "register")} props.type Define o tipo de operação, podendo ser "login" ou "register".
 * @returns {JSX.Element} Formulário de login ou registro com campos para e-mail e senha, e exibição de mensagens de erro.
 * 
 * @example
 * // Uso para login:
 * <AuthForm type="login" />
 * 
 * // Uso para registro:
 * <AuthForm type="register" />
 * 
 * @dependencies
 * - React (useState): Para gerenciar os estados dos campos do formulário e mensagens de erro.
 * - react-router-dom (useNavigate): Para navegação para a página `/dashboard` após autenticação ou registro bem-sucedido.
 * - contexts/AuthContext (useAuth): Para obter os métodos `login` e `register` do contexto de autenticação.
 * - CSS Modules para estilização do componente.
 *
 * @notes
 * - O componente usa `useAuth` para interagir com a autenticação do Firebase.
 * - O formulário verifica e exibe erros específicos de autenticação, como e-mail inválido ou senha incorreta.
 * - O botão de submit exibe "Entrar" para login e "Registrar" para registro, com base no tipo passado.
 */


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import styles from "./authShared.module.css";

interface Props {
  type: "login" | "register";
}

export default function AuthForm({ type }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, register } = useAuth();

  const isLogin = type === "login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password);
      }
      navigate("/dashboard");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use") {
        setError("Esse email já está cadastrado.");
      } else if (err.code === "auth/invalid-email") {
        setError("Email inválido.");
      } else if (err.code === "auth/weak-password") {
        setError("A senha deve ter pelo menos 6 caracteres.");
      } else if (err.code === "auth/user-not-found") {
        setError("Usuário não encontrado.");
      } else if (err.code === "auth/wrong-password") {
        setError("Senha incorreta.");
      } else {
        setError("Erro ao autenticar. Tente novamente.");
      }
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="Email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
        className={styles.input}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        required
        onChange={(e) => setPassword(e.target.value)}
        className={styles.input}
      />

      {error && <p className={styles.error}>{error}</p>}

      <button className={styles.button}>
        {isLogin ? "Entrar" : "Registrar"}
      </button>
    </form>
  );
}
