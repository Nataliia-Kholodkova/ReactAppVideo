import React, { useEffect, useState } from 'react';
import { firebaseAuth } from '../firebaseConf/firebaseConf';
import { onAuthStateChanged } from 'firebase/auth';

const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      }
    });
  }, [user?.uid]);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
