import { firebaseAuth, firebaseFirestore } from './firebaseConf';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';
import authFields from '../utils/authFields';

const signUp = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password)
  .then(({ user }) => {
    const usersCollection = doc(collection(firebaseFirestore, 'users'), user.uid);
    setDoc(usersCollection, authFields);
  });

const signIn = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);

const logout = () => signOut(firebaseAuth);

export { signUp, signIn, logout };
