import { Navigate } from "react-router";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { JSX, useEffect, useState } from 'react';

export default function PrivateRoute({ children }: { children: JSX.Element }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); 
      setLoading(false); 
    });
    return () => unsubscribe(); 
  }, []);

  if (loading) {
    return null; 
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}