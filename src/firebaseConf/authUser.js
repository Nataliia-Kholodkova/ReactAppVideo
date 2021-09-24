import { firebaseAuth } from './firebaseConf';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';

const signUp = (email, password) => createUserWithEmailAndPassword(firebaseAuth, email, password);

const signIn = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);

const logout = () => signOut(firebaseAuth);

export { signUp, signIn, logout };
