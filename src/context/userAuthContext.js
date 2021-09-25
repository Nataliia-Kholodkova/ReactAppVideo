import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { firebaseFirestore, firebaseAuth } from '../firebaseConf/firebaseConf';

const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(firebaseFirestore, 'users', user.uid);
        getDoc(docRef)
          .then((data) => {
            console.log(data);
            if (data.exists()) {
              setProfile(data.data());
            }
          });
      } else {
        setUser(null);
        setProfile(null);
      }
    });
    return unsubscribe;
  }, [user?.uid]);

  return (
    <AuthContext.Provider value={{ user: user, profile: profile }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
