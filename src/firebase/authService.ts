/**
 * @file firebaseAuth.js
 * @description Funções para criação de usuário com e-mail e senha e atualização de perfil no Firebase Authentication.
 * Utiliza os métodos do Firebase para gerenciar usuários.
 *
 * @module firebaseAuth
 * @returns {Promise} Promessas para criação de usuário e atualização de perfil.
 *
 * @example
 * doCreateUserWithEmailAndPassword('usuario@example.com', 'senha123');
 * updateUserProfile(user, { displayName: 'Novo Nome' });
 *
 * @dependencies
 * - firebase/auth (createUserWithEmailAndPassword, updateProfile)
 * - firebaseConfig (auth)
 */

import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "./firebaseConfig";

export const doCreateUserWithEmailAndPassword = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateUserProfile = (user: any, data: { displayName: string }) =>
  updateProfile(user, data);
