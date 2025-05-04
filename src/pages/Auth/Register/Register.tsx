import styles from "./register.module.css";
import RegisterForm from "./RegisterForm"

export default function Register() {
  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <img className={styles.img}src="./images/default-avatar.png" alt="logo-furia" />
        <h1 className={styles.title}>Cadastro</h1>
        <p className={styles.subtitle}>
          Por favor, preencha os campos abaixo para criar sua conta
        </p>
        <RegisterForm />
      </div>
    </div>
  );
}
