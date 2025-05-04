/**
 * @file AuthContext.tsx
 * @description Contexto de autenticação usando Firebase Auth e Firestore. 
 * Gerencia estado do usuário (login, registro, logout) e expõe dados via hook `useAuth`.
 * Integra:
 * - Autenticação por e-mail/senha
 * - Persistência de dados do usuário no Firestore
 * 
 * @module AuthContext
 * @requires react (createContext, useContext, useEffect, useState)
 * @requires firebase/auth (onAuthStateChanged, signInWithEmailAndPassword, ...)
 * @requires firebase/firestore (doc, setDoc)
 * 
 * Interface do contexto de autenticação.
 * @interface AuthContextType
 * @property {User | null} user - Objeto do usuário do Firebase ou `null` se não autenticado.
 * @property {boolean} isAuthenticated - Flag que indica se o usuário está autenticado.
 * @property {(email: string, password: string) => Promise<void>} login - Função para autenticar um usuário.
 * @property {(email: string, password: string) => Promise<void>} register - Função para registrar um novo usuário (cria entrada no Firestore).
 * @property {() => Promise<void>} logout - Função para deslogar o usuário.
 * 
 *  * Provedor de contexto de autenticação. Deve envolver a aplicação ou rotas que necessitam de acesso aos dados do usuário.
 * @component AuthProvider
 * @param {Object} props - Propriedades do componente.
 * @param {ReactNode} props.children - Componentes filhos que terão acesso ao contexto.
 * 
 * @state {User | null} user - Estado interno do usuário.
 * @state {boolean} isAuthenticated - Estado interno de autenticação.
 * 
 * @example
 * // Uso no root da aplicação:
 * <AuthProvider>
 *   <App />
 * </AuthProvider>
 * 
 * Autentica um usuário com e-mail e senha.
 * @async
 * @method login
 * @param {string} email - E-mail do usuário.
 * @param {string} password - Senha do usuário.
 * @throws {FirebaseError} Em caso de falha na autenticação
 */

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { db } from "../firebase/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setIsAuthenticated(!!firebaseUser);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const register = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
  
    // Salvar dados no Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      createdAt: new Date().toISOString(),
    });
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
}
