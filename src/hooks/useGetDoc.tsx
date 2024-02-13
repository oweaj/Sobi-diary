import { useEffect, useMemo, useState } from 'react';
import { db } from '../firebase';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';

interface docType {
  date: string;
  type: string;
  detailType: string;
  content: string;
  price: string;
  id: string;
}

const useGetDoc = (uid: string, type: string | null) => {
  const [docList, setDocList] = useState<docType[]>([]);

  useEffect(() => {
    const userDiary = `user/${uid}/user-diary`;

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
  }, [uid, type]);

  // 내역별 총 계산
  const typeCheck = useMemo(() => docList.filter((item) => item.type === type), [docList]);
  const onlyNumberPrice = useMemo(() => typeCheck.map((item) => item.price.replace(/[^\d]/g, '')), [typeCheck]);
  const total = useMemo(() => onlyNumberPrice.reduce((acc, el) => acc + Number(el), 0), [onlyNumberPrice]);

  return { docList, total };
};

export default useGetDoc;
