import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export async function add(collectionName: string, data: any) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);

    return docRef.id;
  } catch {
    return false;
  }
}

export async function findAll(collectionName: string) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));

    const list : any[]= [];

    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    return list;
  } catch {
    return false;
  }
}
