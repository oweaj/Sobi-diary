import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, onSnapshot, orderBy, query } from 'firebase/firestore';
import { MdOutlineContentPasteSearch } from 'react-icons/md';

interface docType {
  date: string;
  type: string;
  content: string;
  price: number;
  id: string;
}

const MainContent = () => {
  const [docList, setDocList] = useState<docType[]>([]);

  // 추가 입력 후 저장된 데이터 가져오기
  const queryCheck = query(collection(db, 'product'), orderBy('date', 'desc'));
  onSnapshot(queryCheck, (snapShot) => {
    const productArr = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as docType));
    setDocList(productArr);
  });

  return (
    <div className="h-[calc(100%-25rem)]">
      {docList.length ? (
        <ul className="h-full flex flex-col gap-3 overflow-y-auto">
          {docList.map(({ id, date, type, content, price }) => (
            <li
              key={id}
              className="flex items-center justify-between border border-gray-300 rounded-lg py-2 px-4 bg-gray-50"
            >
              <p className="flex flex-col">
                <span className="text-gray-400">{date}</span>
                <span>{content}</span>
              </p>
              <p className={`${type === '수입' ? 'text-sky-500' : 'text-red-400'}`}>{`${
                type === '수입' ? '+' : '-'
              }${price.toLocaleString()}원`}</p>
            </li>
          ))}
        </ul>
      ) : (
        <div className="h-full flex flex-col items-center justify-center gap-1 text-lg text-gray-800">
          <MdOutlineContentPasteSearch className="w-16 h-16" />
          <p>내역이 없습니다.</p>
          <p>하단 추가 버튼을 통해 추가해 보세요.</p>
        </div>
      )}
    </div>
  );
};

export default MainContent;
