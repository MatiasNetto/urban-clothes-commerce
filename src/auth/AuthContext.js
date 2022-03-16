import React, { createContext, useEffect, useState } from 'react';
import { auth } from '../Firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [adminMenu, setAdminMenu] = useState(false);

  useEffect(() => {
    //funcion que se ejecuta al cambiar el estado de login
    const unsuscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsuscribe;
  }, []);

  const login = (user, password) => {
    //resive el email y contrasena y hace login
    return signInWithEmailAndPassword(auth, `${user}@admin.com`, password);
  };

  const logOut = () => {
    setAdminMenu(false);
    return signOut(auth);
  };

  const value = {
    currentUser,
    login,
    logOut,
    setAdminMenu,
    adminMenu,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export { AuthProvider, AuthContext };
