import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { firebaseFirestore, firebaseAuth } from '../firebaseConf/firebaseConf';
import { updateProfileInitialsActionCreator } from '../redux/actionCreators/userActionCreators';

const AuthContext = React.createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const getProfileData = (ref) => {
    return getDoc(ref)
      .then((data) => {
        if (data.exists()) {
          setProfile(data.data());
        }
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(firebaseFirestore, 'users', user.uid);
        getProfileData(docRef);
        onSnapshot(docRef, () => {
          getProfileData(docRef)
            .then(() => {
              const { firstName, lastName } = profile || {};
              updateProfileInitialsActionCreator(firstName, lastName, user);
            });
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
