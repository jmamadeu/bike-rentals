import {
  addDoc,
  collection, deleteDoc, doc, getDocs,
  getFirestore,
  setDoc
} from 'firebase/firestore';
import {
  CreateUserProperties,
  CreateUserWithCredentialsProperties,
  ISaveUser,
  UserProperties
} from '../models/user-model';
import { firebaseApp } from './firebase';



const db = getFirestore(firebaseApp);

export const createUserWithCredentials = async ({
  password,
  ...rest
}: CreateUserWithCredentialsProperties) => {
  const userResponse = await createUser(rest);

  return userResponse
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

export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, 'users'));

  const users: UserProperties[] = [];

  querySnapshot.forEach(doc => {
    users.push({id: doc.id, ...doc.data()} as UserProperties);
  });

  return users;
};

export const deleteUser = async (id: string) => {
  const userRef = doc(db, 'users', id)
  
  await deleteDoc(doc(db, "users", id));
}