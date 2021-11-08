import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { addDoc, collection, getFirestore } from 'firebase/firestore';
import {
  CreateUserProperties,
  CreateUserWithCredentialsProperties
} from '../models/user-model';
import { firebaseApp } from './firebase';

const db = getFirestore(firebaseApp);

export const createUserWithCredentials = async ({
  password,
  ...rest
}: CreateUserWithCredentialsProperties) => {
  const auth = getAuth(firebaseApp);

  const userRef = await createUserWithEmailAndPassword(
    auth,
    rest.email,
    password,
  );

  const userResponse = await createUser(rest);

  return { ...userRef, ...userResponse };
};

export const createUser = async (user: CreateUserProperties) => {
  const docRef = await addDoc(collection(db, 'users'), user);

  return { ...user, id: docRef.id };
};
