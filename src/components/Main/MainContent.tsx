import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { MdOutlineContentPasteSearch } from 'react-icons/md';
import { BsTrash } from 'react-icons/bs';
import useReduce from '../../hook/useReduce';

interface userIdType {
  userId: string | undefined;
  deleteMode: boolean;
  setDeleteMode: Dispatch<SetStateAction<boolean>>;
}

interface docType {
  date: string;
  type: string;
  content: string;
  price: number;
  id: string;
}

const MainContent = ({ userId, deleteMode, setDeleteMode }: userIdType) => {
  const [docList, setDocList] = useState<docType[]>([]);
  const userDiary = `user/${userId}/user-diary`;

  // 추가 입력 후 저장된 데이터 가져오기
  useEffect(() => {
    const queryCheck = query(collection(db, userDiary), orderBy('date', 'desc'));
    onSnapshot(queryCheck, (snapShot) => {
      const productArr = snapShot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as docType));
      setDocList(productArr);
    });
  }, [userId]);

  // const { calc } = useReduce(docList, '수입');

  // console.log(calc);

  // 데이터 삭제 하기
  const handleCheck = (id: string) => {
    const deleteCall = window.confirm('내역을 삭제하시겠습니까?');
    if (deleteCall) {
      deleteDoc(doc(db, userDiary, id));
      setDeleteMode(false);
    }
  };

  return (
    <div className="h-[calc(100%-25rem)]">
      {docList.length ? (
        <ul className="h-full flex flex-col gap-3 overflow-y-auto overflow-x-hidden">
          {docList.map(({ id, date, type, content, price }) => (
            <li
              key={id}
              className="relative flex items-center justify-between py-2 px-5 border rounded-lg border-gray-300 bg-gray-50"
            >
              <div className="flex flex-col">
                <span className="text-gray-400">{date.substring(0, 10)}</span>
                <span>{content}</span>
              </div>
              <span
                className={`${type === '수입' ? 'text-sky-500' : 'text-red-400'} ${
                  deleteMode ? 'mr-5' : 'mr-0'
                } transition-all duration-200`}
              >
                {type === '수입' ? '+' : '-'}
                {Number(price).toLocaleString()}원
              </span>
              <button
                type="button"
                className={`absolute ${deleteMode ? 'right-2' : '-right-5'} transition-all duration-200`}
                onClick={() => handleCheck(id)}
              >
                <BsTrash className="w-5 h-5" />
              </button>
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
