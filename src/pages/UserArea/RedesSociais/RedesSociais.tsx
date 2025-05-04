/**
 * @file RedeSociais.jsx
 * @description Componente para vinculação e gerenciamento de contas em redes sociais. Permite conectar e desconectar contas do Facebook, Twitter e Instagram, além de permitir o cadastro manual de links de outras redes sociais como TikTok e YouTube.
 * 
 * Funcionalidades:
 * - Exibe botões para conectar contas de Facebook, Twitter e Instagram.
 * - Permite o cadastro manual de links de outras redes sociais, como TikTok e YouTube.
 * - Exibe as contas vinculadas, com informações sobre a data de conexão e a opção de desvincular.
 * - Utiliza animações para exibir a lista de contas vinculadas.
 * 
 * @component
 * @returns {JSX.Element} Formulário de vinculação de redes sociais e exibição de contas conectadas.
 * 
 * @example
 * <RedeSociais />
 * 
 * @dependencies
 * - React: Para renderizar o componente.
 * - `lucide-react`: Para ícones de redes sociais.
 * - `framer-motion`: Para animações de transição.
 * - CSS Modules para estilização do componente.
 * 
 * @state
 * - `connectedAccounts`: Lista de contas conectadas.
 * - `isLoading`: Controla o estado de carregamento para cada rede social durante a conexão.
 * - `error`: Mensagem de erro, caso ocorra algum problema durante a conexão.
 * - `manualLinks`: Armazena os links manualmente inseridos pelos usuários para outras redes sociais.
 * - `selectedPlatform`: Plataforma selecionada para conexão.
 * 
 * @functions
 * - `handleConnectClick`: Inicia o processo de conexão para a rede social selecionada.
 * - `handleDisconnect`: Desvincula uma conta conectada.
 * - `handleChange`: Atualiza os links manuais inseridos.
 * - `handleSubmit`: Realiza a submissão do formulário para conectar ou atualizar o link de uma rede social.
 * - `getPlatformIcon`: Retorna o ícone correspondente à plataforma selecionada.
 * 
 * @notes
 * - O sistema permite adicionar contas manualmente e conectar automaticamente usando links válidos de redes sociais.
 * - As animações de transição são implementadas com `framer-motion` para uma experiência mais fluida ao exibir as contas conectadas.
 * 
 * @example
 * <RedeSociais />
 */


import { useState } from "react";
import {
  Facebook,
  Instagram,
  Twitter,
  Unlink,
  Loader2,
  Youtube,
  Link2,
} from "lucide-react";
import Navbar from "../../../components/Navbar";
import styles from "./redesSociais.module.css";
import { motion, AnimatePresence } from "framer-motion";

type SocialAccount = {
  platform: "facebook" | "twitter" | "instagram" | "tiktok" | "youtube";
  username: string;
  connectedAt: Date;
  isManual?: boolean;
};

const RedeSociais = () => {
  const [connectedAccounts, setConnectedAccounts] = useState<SocialAccount[]>([
    {
      platform: "instagram",
      username: "@meuinstagram",
      connectedAt: new Date(),
    },
  ]);

  const [isLoading, setIsLoading] = useState<
    "facebook" | "twitter" | "instagram" | "tiktok" | "youtube" | null
  >(null);
  const [error, setError] = useState<string | null>(null);
  const [manualLinks, setManualLinks] = useState({
    instagram: "",
    twitter: "",
    tiktok: "",
    youtube: "",
    facebook: "",
  });
  const [selectedPlatform, setSelectedPlatform] = useState<
    "facebook" | "twitter" | "instagram" | "tiktok" | "youtube" | null
  >(null);

  const handleConnectClick = (
    platform: "facebook" | "twitter" | "instagram"
  ) => {
    setSelectedPlatform(platform);
    setManualLinks({
      ...manualLinks,
      [platform]: "",
    });
  };

  const handleDisconnect = (
    platform: SocialAccount["platform"],
    username: string
  ) => {
    setConnectedAccounts((prev) =>
      prev.filter(
        (acc) => !(acc.platform === platform && acc.username === username)
      )
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setManualLinks({ ...manualLinks, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedPlatform) return;

    const url = manualLinks[selectedPlatform];
    if (!url.trim()) {
      setError(`Por favor, insira a URL do ${selectedPlatform}`);
      return;
    }

    setIsLoading(selectedPlatform);
    setError(null);

    try {
      // Simulação de tempo de carregamento
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Verifica se já está conectado
      if (
        connectedAccounts.some(
          (acc) => acc.platform === selectedPlatform && !acc.isManual
        )
      ) {
        setError(
          `Você já conectou sua conta do ${
            selectedPlatform.charAt(0).toUpperCase() + selectedPlatform.slice(1)
          }`
        );
        return;
      }

      // Extrai o username da URL
      let username = url;
      try {
        const urlObj = new URL(url);
        username = urlObj.pathname.startsWith("/@")
          ? urlObj.pathname.slice(1)
          : urlObj.pathname || urlObj.hostname;
      } catch (e) {
        console.log(e);
        // Se não for uma URL válida, usa o valor como está
      }

      const newAccount: SocialAccount = {
        platform: selectedPlatform,
        username,
        connectedAt: new Date(),
        isManual: true,
      };

      setConnectedAccounts([...connectedAccounts, newAccount]);
      setSelectedPlatform(null);
      setManualLinks({
        ...manualLinks,
        [selectedPlatform]: "",
      });
    } catch (error) {
      console.error(error);
      setError(`Falha ao conectar com ${selectedPlatform}. Tente novamente.`);
    } finally {
      setIsLoading(null);
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case "facebook":
        return <Facebook size={16} />;
      case "twitter":
        return <Twitter size={16} />;
      case "instagram":
        return <Instagram size={16} />;
      case "youtube":
        return <Youtube size={16} />;
      case "tiktok":
        return <span className={styles.tiktokIcon}>TK</span>;
      default:
        return <Link2 size={16} />;
    }
  };

  return (
    <div className={styles.container}>
      <Navbar />

      <div className={styles.socialSection}>
        <h2 className={styles.title}>Vincular Redes Sociais</h2>

        <div className={styles.socialButtons}>
          <button
            className={`${styles.socialButton} ${styles.facebook}`}
            onClick={() => handleConnectClick("facebook")}
            disabled={isLoading === "facebook"}
          >
            <Facebook />
            <span>Conectar Facebook</span>
          </button>

          <button
            className={`${styles.socialButton} ${styles.twitter}`}
            onClick={() => handleConnectClick("twitter")}
            disabled={isLoading === "twitter"}
          >
            <Twitter />
            <span>Conectar Twitter</span>
          </button>

          <button
            className={`${styles.socialButton} ${styles.instagram}`}
            onClick={() => handleConnectClick("instagram")}
            disabled={isLoading === "instagram"}
          >
            <Instagram />
            <span>Conectar Instagram</span>
          </button>
        </div>

        {selectedPlatform && (
          <form className={styles.manualForm} onSubmit={handleSubmit}>
            <h3>
              Adicionar URL do{" "}
              {selectedPlatform.charAt(0).toUpperCase() +
                selectedPlatform.slice(1)}
            </h3>

            <input
              type="url"
              name={selectedPlatform}
              value={manualLinks[selectedPlatform]}
              onChange={handleChange}
              placeholder={`https://${selectedPlatform}.com/seuusuario`}
              disabled={isLoading === selectedPlatform}
            />

            <div className={styles.formActions}>
              <button
                type="submit"
                className={styles.button}
                disabled={isLoading === selectedPlatform}
              >
                {isLoading === selectedPlatform ? (
                  <>
                    <Loader2 className={styles.spinAnimation} size={16} />
                    <span>Conectando...</span>
                  </>
                ) : (
                  "Conectar"
                )}
              </button>

              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setSelectedPlatform(null)}
                disabled={isLoading === selectedPlatform}
              >
                Cancelar
              </button>
            </div>
          </form>
        )}

        {error && <div className={styles.errorMessage}>{error}</div>}

        <form
          className={styles.otherLinksForm}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}
        >
          <h3>Outras Redes Sociais</h3>

          <label>TikTok</label>
          <input
            type="url"
            name="tiktok"
            value={manualLinks.tiktok}
            onChange={handleChange}
            placeholder="https://tiktok.com/@seuusuario"
          />

          <label>YouTube</label>
          <input
            type="url"
            name="youtube"
            value={manualLinks.youtube}
            onChange={handleChange}
            placeholder="https://youtube.com/@seucanal"
          />

          <button type="submit" className={styles.button}>
            Salvar Links
          </button>
        </form>

        <AnimatePresence>
          {connectedAccounts.length > 0 && (
            <motion.div
              className={styles.connectedAccounts}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4 }}
            >
              <h3>Contas Vinculadas</h3>

              <div className={styles.accountList}>
                {connectedAccounts.map((account, index) => (
                  <div
                    key={index}
                    className={`${styles.accountItem} ${
                      account.isManual ? styles.manual : ""
                    }`}
                  >
                    {getPlatformIcon(account.platform)}
                    <span>{account.username}</span>
                    <span className={styles.connectionDate}>
                      {account.isManual ? "Adicionado" : "Conectado"} em:{" "}
                      {account.connectedAt.toLocaleDateString()}
                    </span>
                    <button
                      className={styles.unlinkButton}
                      onClick={() => handleDisconnect(account.platform, account.username)}
                    >
                      <Unlink size={16} />{" "}
                      {account.isManual ? "Remover" : "Desvincular"}
                    </button>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default RedeSociais;