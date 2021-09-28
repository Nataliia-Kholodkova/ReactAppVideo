import React, { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { firebaseFirestore, firebaseAuth } from '../firebaseConf/firebaseConf';
import { updateProfileInitials } from '../firebaseConf/profileUpdate';

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
    let snapshotUnsubscribe;
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
        const docRef = doc(firebaseFirestore, 'users', user.uid);
        getProfileData(docRef);
        snapshotUnsubscribe = onSnapshot(docRef, () => {
          getProfileData(docRef)
            .then(() => {
              const { firstName, lastName } = profile || {};
              updateProfileInitials(firstName, lastName, user);
            });
        });
      } else {
        setUser(null);
        setProfile(null);
      }
    });
    return () => {
      unsubscribe();
      if (snapshotUnsubscribe) {
        snapshotUnsubscribe();
      }
    };
  }, [user?.uid]);

  return (
    <AuthContext.Provider value={{ user: user, profile: profile }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
