import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { MdOutlineContentPasteSearch } from 'react-icons/md';

interface userIdType {
  userId: string | undefined;
  deleteMode: boolean;
}

interface docType {
  date: string;
  type: string;
  content: string;
  price: number;
  id: string;
}

const MainContent = ({ userId, deleteMode }: userIdType) => {
  const [docList, setDocList] = useState<docType[]>([]);

  // 추가 입력 후 저장된 데이터 가져오기
  useEffect(() => {
    const queryCheck = query(collection(db, `user/${userId}/user-diary`), orderBy('date', 'desc'));
    onSnapshot(queryCheck, (snapShot) => {
      const productArr = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as docType));
      setDocList(productArr);
    });
  }, [userId]);

  // 체크가 된 내역
  const handleCheck = (id: string) => {
    console.log(id);
  };

  return (
    <div className="h-[calc(100%-25rem)]">
      {docList.length ? (
        <ul className="h-full flex flex-col gap-3 overflow-y-auto">
          {docList.map(({ id, date, type, content, price }) => (
            <li
              key={id}
              className="flex items-center justify-between py-2 px-5 border rounded-lg border-gray-300 bg-gray-50"
            >
              <p className="flex flex-col">
                <span className="text-gray-400">{date.substring(0, 10)}</span>
                <span>{content}</span>
              </p>
              <div className="flex items-center gap-3">
                <p className={type === '수입' ? 'text-sky-500' : 'text-red-400'}>
                  {type === '수입' ? '+' : '-'}
                  {Number(price).toLocaleString()}원
                </p>
                {deleteMode && <input type="checkbox" className="w-4 h-4" onClick={() => handleCheck(id)} />}
              </div>
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
