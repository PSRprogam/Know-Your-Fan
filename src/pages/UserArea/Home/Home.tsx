/**
 * @file Home.jsx
 * @description Componente de página inicial para a FURIA HOME. Exibe conteúdo exclusivo, destaques, eventos e integrações com redes sociais. Utiliza animações do Framer Motion para uma transição suave dos elementos.
 * 
 * Funcionalidades:
 * - Exibe uma introdução ao site FURIA HOME com título e subtítulo.
 * - Apresenta duas seções principais:
 *    1. **Destaques**: Exibe cards com conteúdo relacionado a eventos e coleções.
 *    2. **Eventos**: Exibe cards sobre eventos futuros com detalhes como data e título.
 * - Integração com redes sociais, mostrando postagens do Instagram e X (anteriormente Twitter).
 * - Usa animações do Framer Motion para transições suaves entre elementos, criando uma experiência visual mais dinâmica.
 * 
 * @component
 * @returns {JSX.Element} Página principal que exibe destaques, eventos e redes sociais.
 * 
 * @example
 * <Home />
 * 
 * @dependencies
 * - React (motion from framer-motion): Para animações de transição de elementos.
 * - react-social-media-embed (InstagramEmbed, XEmbed): Para integrar postagens do Instagram e X (Twitter).
 * - CSS Modules para estilização do componente.
 * 
 * @notes
 * - Cada seção de "Destaques" e "Eventos" é renderizada com base em um array de objetos com informações como título, descrição e imagem.
 * - Os elementos têm animações para aparecer de forma suave ao ser visualizados no viewport.
 * - As postagens do Instagram e X são embutidas diretamente na página, utilizando URLs específicas para cada postagem.
 * - O layout é dividido em seções para melhor organização e estética.
 */


import { motion } from "framer-motion";
import Navbar from "../../../components/Navbar";
import styles from "./home.module.css";
import { InstagramEmbed, XEmbed } from "react-social-media-embed";

export default function Home() {
  const destaques = [
    {
      title: "CS2 MAJOR",
      description: "Acompanhe a Furia no Blast Austin Major 2025",
      image: "./images/major.jpg",
    },
    {
      title: "LAN PARTY",
      description: "Reveja os melhores momentos do evento presencial que marcou a história do Brasil e da Furia.",
      image: "./images/majoRio.jpg",
    },
    {
      title: "MERCH DROP",
      description: "Nova coleção de camisetas FURIA já disponíveis, adquira a sua.",
      image: "./images/colecao.jpg",
    },
  ];

  const eventos = [
    {
      title: "FURIA vs The MongolZ",
      description: "10th of May 2025",
      image: "./images/pgl.jpg",
    },
    {
      title: "IEM DALLAS 2025",
      description: "O campeonato de milhões. May 19th - May 25th 2025",
      image: "./images/dallas.jpg",
    },
  ];

  return (
    <div className={styles.homeContainer}>
      <Navbar />
      <div className={styles.pageContent}>
        <div className={styles.overlay}>
          <div className={styles.content}>
            <h1 className={styles.title}>FURIA HOME</h1>
            <p className={styles.subtitle}>
              Explore conteúdos exclusivos, eventos e novidades do universo FURIA.
            </p>

            {/* Destaques */}
            <section className={styles.cardsSection}>
              <h2 className={styles.sectionTitle}>Destaques</h2>
              <div className={styles.cardGrid}>
                {destaques.map((item, i) => (
                  <motion.div
                    className={styles.card}
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <div className={styles.cardOverlay}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Eventos */}
            <section className={styles.cardsSection}>
              <h2 className={styles.sectionTitle}>Eventos</h2>
              <div className={styles.cardGrid}>
                {eventos.map((item, i) => (
                  <motion.div
                    className={styles.card}
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                  >
                    <div className={styles.cardOverlay}>
                      <h3>{item.title}</h3>
                      <p>{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Rede Sociais */}
            <section className={styles.redeSociais}>
              <h2 className={styles.sectionTitle}>Rede Sociais</h2>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={styles.socialCard}
              >
                <h3>Instagram</h3>
                <div className={styles.instagramContainer}>
                  <div className={styles.instagramEmbedWrapper}>
                    <InstagramEmbed url='https://www.instagram.com/reel/DHvma9GxXND/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' />
                  </div>
                  <div className={styles.instagramEmbedWrapper}>
                    <InstagramEmbed url='https://www.instagram.com/reel/DJKlPRUB1Xg/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' />
                  </div>
                  <div className={styles.instagramEmbedWrapper}>
                    <InstagramEmbed url='https://www.instagram.com/p/DJKJzkbxgiM/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA==' />
                  </div>
                </div>
                <h3>X</h3>
                <div className={styles.xContainer}>
                  <div className={styles.xEmbedWrapper}>
                    <XEmbed url='https://twitter.com/FURIA/status/1918440491013607742?ref_src=twsrc%5Etfw' />
                  </div>
                  <div className={styles.xEmbedWrapper}>
                    <XEmbed url='https://twitter.com/FURIA/status/1918367983136604270?ref_src=twsrc%5Etfw' />
                  </div>
                  <div className={styles.xEmbedWrapper}>
                    <XEmbed url='https://twitter.com/FURIA/status/1918440491013607742?ref_src=twsrc%5Etfw' />
                  </div>
                </div>
              </motion.div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
