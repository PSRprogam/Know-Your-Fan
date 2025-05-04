/**
 * @file Ponto.jsx
 * @description Componente de exibição dos pontos e patentes do usuário. Apresenta uma tabela com o progresso do usuário nas patentes, baseado no sistema de pontos.
 * 
 * Funcionalidades:
 * - Exibe uma tabela de progresso que mostra as patentes disponíveis (Prata, Ouro, Platinum, Diamond, Global), com a quantidade de pontos necessários para cada uma e o progresso do usuário até o momento.
 * - A tabela inclui um sistema de barras de progresso que ilustra visualmente quanto o usuário avançou em cada patente.
 * - O sistema de pontos tem como objetivo incentivar a interação dos fãs com a plataforma. Cada interação (que pode ser relacionada a ações como visualizações, comentários, participações em eventos, etc.) soma pontos ao perfil do usuário, fazendo com que ele suba de patente. 
 *   Embora o sistema de pontos ainda não esteja implementado, ele é essencial para o engajamento contínuo dos usuários, promovendo uma experiência gamificada que motiva os fãs a interagir mais com a plataforma.
 * 
 * @component
 * @returns {JSX.Element} Página de pontos e patentes, com tabela de progresso e informações sobre o sistema de patentes.
 * 
 * @example
 * <Ponto />
 * 
 * @dependencies
 * - React: Para renderizar o componente.
 * - CSS Modules para estilização do componente.
 * 
 * @notes
 * - A tabela de pontos exibe diferentes patentes com a quantidade de pontos necessários para alcançá-las, e o progresso atual do usuário.
 * - O sistema de pontos e patentes ainda não está implementado no código, mas a ideia é somar pontos com interações do usuário e permitir que ele suba de patente.
 * - O sistema de gamificação visa aumentar o engajamento dos fãs ao recompensá-los conforme sua participação na plataforma.
 */


import Navbar from "../../../components/Navbar";
import styles from "./pontos.module.css";

export default function Ponto() {
  return (
    <div className={styles.pageWrapper}>
      <Navbar />
      <main className={styles.section}>
        <h3>
          <i className="fas fa-trophy"></i> Meus Pontos e Patente
        </h3>
        <table className={styles.pointsTable}>
          <thead>
            <tr>
              <th>Patente</th>
              <th>Pontos Necessários</th>
              <th>Seu Progresso</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.rankSilver}>Prata</td>
              <td>0 - 999</td>
              <td>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: "75%" }}
                  ></div>
                </div>
                <small>750/999 pontos</small>
              </td>
              <td>
                <span className={styles.badge}>Atual</span>
              </td>
            </tr>
            <tr>
              <td className={styles.rankGold}>Ouro</td>
              <td>1.000 - 4.999</td>
              <td>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: "15%" }}
                  ></div>
                </div>
                <small>750/4.999 pontos</small>
              </td>
              <td></td>
            </tr>
            <tr>
              <td className={styles.rankPlatinum}>Ak</td>
              <td>5.000 - 9.999</td>
              <td>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: "7%" }}
                  ></div>
                </div>
                <small>750/9.999 pontos</small>
              </td>
              <td></td>
            </tr>
            <tr>
              <td className={styles.rankDiamond}>AK Cruzada</td>
              <td>10.000 - 24.999</td>
              <td>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: "3%" }}
                  ></div>
                </div>
                <small>750/24.999 pontos</small>
              </td>
              <td></td>
            </tr>
            <tr>
              <td className={styles.rankGlobal}>Global</td>
              <td>25.000+</td>
              <td>
                <div className={styles.progressContainer}>
                  <div
                    className={styles.progressBar}
                    style={{ width: "1%" }}
                  ></div>
                </div>
                <small>750/25.000 pontos</small>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}
