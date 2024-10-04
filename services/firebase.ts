import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  onSnapshot,
} from 'firebase/firestore';

export async function add(collectionName: string, data: any) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);

    return docRef.id;
  } catch {
    return false;
  }
}
export async function getTotalSalesDay(func: any) {
  const dataInicial = new Date();
  const dataFinal = new Date();

  dataInicial.setHours(0, 0, 0);
  dataFinal.setHours(23, 59, 59);

  console.log('🚀 ~ getTotalSalesDay ~ dataInicial:', dataInicial);
  console.log('🚀 ~ getTotalSalesDay ~ dataFinal:', dataFinal);

  const q = query(
    collection(db, 'Vendas'),
    where('data', '>=', dataInicial),
    where('data', '<=', dataFinal)
  );

  return onSnapshot(q, (querySnapshot) => {
    let total = 0;

    querySnapshot.forEach((doc) => {
      total += doc.data().valor;
    });

    func(total);
  });
}

export async function findAll(
  collectionName: string,
  whereStatment?: Record<string, string>
) {
  try {
    let conditions: any[] = [];

    if (whereStatment) {
      conditions = Object.keys(whereStatment).map((key) =>
        where(key, '==', whereStatment[key])
      );
    }

    const q = query(collection(db, collectionName), ...conditions);

    const querySnapshot = await getDocs(q);

    const list: any[] = [];

    querySnapshot.forEach((doc) => {
      list.push({ id: doc.id, ...doc.data() });
    });

    return list;
  } catch {
    return false;
  }
}
