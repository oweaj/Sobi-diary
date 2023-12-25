import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';

interface docType {
  date: string;
  type: string;
  content: string;
  price: number;
  id: string;
}

const useReduce = (userId: string | undefined) => {
  const [docList, setDocList] = useState<docType[]>([]);

  useEffect(() => {
    const userDiary = `user/${userId}/user-diary`;
    const queryCheck = query(collection(db, userDiary), orderBy('date', 'desc'));
    onSnapshot(queryCheck, (snapShot) => {
      const productArr = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as docType));
      setDocList(productArr);
    });
  }, [userId]);

  const handleTotal = (type: string) => {
    const typeCheck = docList.filter((item) => item.type === type);
    const calc = typeCheck.map((item) => item.price).reduce((acc, el) => acc + Number(el), 0);

    return calc;
  };

  return { docList, handleTotal };
};

export default useReduce;
