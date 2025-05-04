/**
 * @file firebaseConfig.js
 * @description Este arquivo configura a integração com o Firebase para a aplicação "Know Your Fan". 
 * Ele inicializa o Firebase com as credenciais fornecidas, configura os serviços de autenticação, 
 * banco de dados Firestore e armazenamento, permitindo a interação com esses serviços no backend da aplicação.
 * As credenciais (apiKey, authDomain, etc.) devem ser obtidas no console do Firebase.
 *
 * @module firebaseConfig
 * @returns {Object} Configurações e instâncias do Firebase para autenticação, banco de dados e armazenamento.
 *
 * @example
 * // Uso em outros módulos para acessar Firebase:
 * import { auth, db, storage } from './firebaseConfig';
 *
 * @dependencies
 * - firebase/app (initializeApp)
 * - firebase/auth (getAuth)
 * - firebase/firestore (getFirestore)
 * - firebase/storage (getStorage)
 *
 * @note
 * As credenciais do Firebase, como apiKey, authDomain, etc., devem ser obtidas no site do Firebase.
 * Para isso, acesse o [console do Firebase](https://console.firebase.google.com/), selecione seu projeto e 
 * copie as configurações do Firebase a partir da seção "Configurações do projeto" em "Suas apps".
 */

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_AUTH_DOMAIN",
  projectId: "SEU_PROJECT_ID",
  storageBucket: "SEU_STORAGE_BUCKET",
  messagingSenderId: "SEU_MESSAGING_SENDER_ID",
  appId: "SEU_APP_ID",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); 

export { app, auth, db, storage };