import { Sale } from '@/types/Sale';
import { db } from '../firebaseConfig';
import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  onSnapshot,
  QueryFieldFilterConstraint,
  getDoc,
  doc,
  orderBy,
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

export async function findAllSales(
  whereStatment?: Record<string, string>
): Promise<Sale[]> {
  try {
    let conditions: QueryFieldFilterConstraint[] = [];

    if (whereStatment) {
      conditions = Object.keys(whereStatment).map((key) =>
        where(key, '==', whereStatment[key])
      );
    }

    const q = query(collection(db, 'Vendas'), orderBy('data', 'desc'), ...conditions);

    const querySnapshot = await getDocs(q);

    const list: any[] = [];

    for await (let document of querySnapshot.docs) {
      const data = document.data();

      const categorySnapshot = await getDoc(
        doc(db, 'Categorias', data.categoria_id)
      );

      const category = {
        id: categorySnapshot.id,
        ...categorySnapshot.data(),
      };
      
      list.push({
        id: document.id,
        ...data,
        data: data.data.toDate(),
        categoria: category,
      });
    }

    return list;
  } catch {
    return [];
  }
}
