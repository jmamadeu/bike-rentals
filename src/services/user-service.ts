import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc
} from 'firebase/firestore';
import {
  CreateUserProperties,
  CreateUserWithCredentialsProperties,
  ISaveUser
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

export const saveUser = async ({ id, password, ...rest }: ISaveUser) => {
  if (id) {
    const userRef = doc(db, 'users', id);

    setDoc(userRef, rest, { merge: true });

    return { ...rest, id };
  }

  return await createUserWithCredentials({ ...rest, password });
};
