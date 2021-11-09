import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  setDoc
} from 'firebase/firestore';
import { BikeProperties, IBikeFormInputs } from '../models/bike-model';
import { firebaseApp } from './firebase';

const db = getFirestore(firebaseApp);

export async function createBike(bike: IBikeFormInputs): Promise<BikeProperties> {
  const bikeRef = await addDoc(collection(db, 'bikes'), bike);

  return { ...bike, id: bikeRef.id as string };
}

export async function getAllBikes() {
  const querySnapshot = await getDocs(collection(db, 'bikes'));

  const bikes: BikeProperties[] = [];

  querySnapshot.forEach(doc => {
    bikes.push({ id: doc.id, ...doc.data() } as BikeProperties);
  });

  return bikes;
}

export const deleteBike = async (id: string) =>
  await deleteDoc(doc(db, 'bikes', id));

export const updateBike = async ({
  id,
  ...bike
}: BikeProperties): Promise<BikeProperties> => {
  const bikeRef = doc(db, 'bikes', id);

  await setDoc(bikeRef, bike, { merge: true });

  return { ...bike, id };
};
