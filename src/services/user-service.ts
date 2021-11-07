import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import {
  CreateUserLoginProperties,
  CreateUserProperties
} from '../models/user-model';
import { firebaseApp } from './firebase';

const db = getFirestore(firebaseApp);

export const createUserLogin = async (user: CreateUserLoginProperties) => {
  const auth = getAuth(firebaseApp);

  const userRef = createUserWithEmailAndPassword(
    auth,
    user.email,
    user.password,
  );

  return userRef;
};

export const createUser = async (user: CreateUserProperties) => {
  const docRef = await addDoc(collection(db, 'users'), user);

  return { ...user, id: docRef.id };
};
