import React, { useEffect, useState, createContext } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { firebaseFirestore, firebaseAuth } from '../firebaseConf/firebaseConf';
import { updateProfileInitials } from '../firebaseConf/profileUpdate';

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);

  const getProfileData = (ref) => {
    return getDoc(ref)
      .then((data) => {
        if (data.exists()) {
          setProfile(data.data());
        }
      })
      .catch((error) => error);
  };

  useEffect(() => {
    return onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
        setProfile(null);
      }
    });
  }, []);

  useEffect(() => {
    return onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        const docRef = doc(firebaseFirestore, 'users', user.uid);
        getProfileData(docRef);
      } else {
        setUser(null);
        setProfile(null);
      }
    });
  }, []);

  useEffect(() => {
    if (user) {
      const docRef = doc(firebaseFirestore, 'users', user.uid);
      return onSnapshot(docRef, () => {
        getProfileData(docRef)
          .then(() => {
            const { firstName, lastName } = profile || {};
            updateProfileInitials(firstName, lastName, user);
          });
      });
    }
  }, [profile?.firstName, profile?.lastName]);

  return (
    <AuthContext.Provider value={{ currentUser: user, currentUserProfile: profile }}>{children}</AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
