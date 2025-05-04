/**
 * @file AlterarDados.jsx
 * @description Componente de página para alteração de dados de perfil do usuário. Permite ao usuário alterar informações pessoais como nome, CPF, data de nascimento, gênero e e-mail, bem como atualizar sua senha. O componente utiliza a autenticação do Firebase para gerenciar os dados do usuário e realiza as atualizações no Firestore.
 * 
 * Funcionalidades:
 * - Carrega os dados do usuário a partir do Firestore quando o componente é montado.
 * - Permite alterar o nome, CPF (apenas leitura após preenchido), data de nascimento, gênero e e-mail.
 * - Permite alterar a senha com verificação de senha atual e confirmação de nova senha.
 * - O componente inclui a validação de dados antes de salvar as alterações e uma indicação de carregamento ou salvamento de dados.
 * - Exibe uma mensagem de alerta com o resultado da atualização dos dados.
 * - Após a alteração de senha, o usuário é deslogado e redirecionado para a tela de login.
 * 
 * @component
 * @returns {JSX.Element} Formulário para alteração de dados do usuário, com campos para dados pessoais e senha.
 * 
 * @example
 * <AlterarDados />
 * 
 * @dependencies
 * - React (useState, useEffect): Para gerenciamento de estados, efeitos colaterais e lógica de controle do componente.
 * - react-router-dom (useNavigate): Para navegação após alteração de senha e logout.
 * - Firebase (auth, db, updateDoc, getDoc, updatePassword, updateEmail): Para interações com a autenticação do Firebase e o Firestore.
 * - lucide-react (Eye, EyeOff): Para exibir e alternar a visibilidade das senhas.
 * - Navbar: Componente de navegação reutilizável.
 * - CSS Modules para estilização do componente.
 * 
 * @notes
 * - O CPF é apenas editável uma vez, não sendo possível alterá-lo após o preenchimento.
 * - As senhas são validadas para garantir que o campo de "nova senha" corresponda ao campo de "confirmar senha".
 * - A senha será alterada apenas se ambos os campos de senha forem preenchidos e coincidirem.
 * - Após a alteração da senha, o usuário é deslogado e redirecionado para a tela de login.
 * - O componente exibe um carregamento enquanto os dados do usuário estão sendo recuperados e um estado de salvamento enquanto as alterações são aplicadas.
 */


import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { updatePassword, updateEmail } from "firebase/auth";
import { Eye, EyeOff } from "lucide-react";
import Navbar from "../../../components/Navbar";
import styles from "./alterarDados.module.css";

type UserData = {
  nome: string;
  cpf: string;
  dataNascimento: string;
  genero: "feminino" | "masculino" | "outro" | "";
  email: string;
};

export default function AlterarDados() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate(); // ✅ adicionado

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    const fetchData = async () => {
      const docRef = doc(db, "usuarios", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData({
          nome: data.nome || "",
          cpf: data.cpf || "",
          dataNascimento: data.dataNascimento || "",
          genero: data.genero || "",
          email: data.email || "",
        });
      }

      setLoading(false);
    };

    fetchData();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    if (!userData) return;
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const user = auth.currentUser;
      const uid = user?.uid;
      if (!uid || !userData) return;

      // Atualiza dados no Firestore
      const userRef = doc(db, "usuarios", uid);
      await updateDoc(userRef, userData);

      // Atualiza e-mail se tiver mudado
      if (userData.email && user.email !== userData.email) {
        await updateEmail(user, userData.email);
      }

      // Verifica se senha foi preenchida
      if (newPassword || confirmPassword) {
        if (newPassword !== confirmPassword) {
          alert("As senhas não coincidem.");
          setSaving(false);
          return;
        }

        try {
          await updatePassword(user, newPassword);
          alert("Senha atualizada com sucesso! Faça login novamente.");
          await auth.signOut();
          navigate("/login");
          return;
        } 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (err: any) {
          if (err.code === "auth/requires-recent-login") {
            alert("Por segurança, faça login novamente para alterar a senha.");
            await auth.signOut();
            navigate("/login");
            return;
          } else {
            console.error(err);
            alert("Erro ao atualizar a senha.");
            setSaving(false);
            return;
          }
        }
      }

      alert("Dados atualizados com sucesso!");
    } catch (error) {
      console.error("Erro ao atualizar:", error);
      alert("Erro ao salvar os dados. Tente novamente.");
    }

    setSaving(false);
  };

  if (loading) return <p className={styles.loading}>Carregando dados...</p>;

  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Alterar Dados do Perfil</h2>

        <div className={styles.data}>
          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Nome Completo</label>
              <input
                type="text"
                name="nome"
                value={userData?.nome || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>CPF</label>
              <input
                type="text"
                name="cpf"
                value={userData?.cpf || ""}
                onChange={handleChange}
                readOnly={!!userData?.cpf}
              />
              {userData?.cpf && (
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "#aaa",
                    marginTop: "0.3rem",
                  }}
                >
                  O CPF só pode ser definido uma vez.
                </p>
              )}
            </div>
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label>Data de Nascimento</label>
              <input
                type="date"
                name="dataNascimento"
                value={userData?.dataNascimento || ""}
                onChange={handleChange}
                required
              />
            </div>

            <div className={styles.inputGroup}>
              <label>Gênero</label>
              <select
                name="genero"
                value={userData?.genero || ""}
                onChange={handleChange}
                required
              >
                <option value="">Selecione...</option>
                <option value="feminino">Feminino</option>
                <option value="masculino">Masculino</option>
                <option value="outro">Outro</option>
              </select>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>E-mail</label>
            <input
              type="email"
              name="email"
              value={userData?.email || ""}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <hr />

        <h3>Alterar Senha</h3>

        <div className={styles.row}>
          <div className={styles.inputGroup}>
            <label>Nova Senha</label>
            <div className={styles.passwordFieldWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Deixe em branco para manter a atual"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className={styles.togglePasswordBtn}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className={styles.inputGroup}>
            <label>Confirmar Nova Senha</label>
            <div className={styles.passwordFieldWrapper}>
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirme sua nova senha"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className={styles.togglePasswordBtn}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
        </div>

        <button type="submit" disabled={saving}>
          {saving ? "Salvando..." : "Salvar Alterações"}
        </button>
      </form>
    </div>
  );
}