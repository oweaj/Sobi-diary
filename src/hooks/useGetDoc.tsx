import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';

interface docType {
  date: string;
  type: string;
  content: string;
  price: string;
  id: string;
}

const useReduce = (userId: string | undefined, type: string | null) => {
  const [docList, setDocList] = useState<docType[]>([]);

  useEffect(() => {
    const userDiary = `user/${userId}/user-diary`;

    // 내역 button 필터링
    if (type === '수입' || type === '지출') {
      const queryCheck = query(collection(db, userDiary), where('type', '==', type), orderBy('date', 'desc'));
      onSnapshot(queryCheck, (snapShot) => {
        const productArr = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as docType));
        setDocList(productArr);
      });
    } else {
      // 전체 내역 필터링
      const queryCheck = query(collection(db, userDiary), orderBy('date', 'desc'));
      onSnapshot(queryCheck, (snapShot) => {
        const productArr = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as docType));
        setDocList(productArr);
      });
    }
  }, [userId, type]);

  // 내역별 총 계산
  const handleTotal = () => {
    const typeCheck = docList.filter((item) => item.type === type);
    const onlyNumberPrice = typeCheck.map((item) => item.price.replace(/[^\d]/g, ''));
    const calc = onlyNumberPrice.reduce((acc, el) => acc + Number(el), 0);

    return calc;
  };

  return { docList, handleTotal };
};

export default useReduce;
