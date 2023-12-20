import { ChangeEvent, MouseEvent, Dispatch, SetStateAction, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';

interface modalState {
  open: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const MainModalCreate = ({ open, setModal }: modalState) => {
  const [type, setType] = useState<string | null>(null);
  const today = new Date().toISOString().substring(0, 10);
  const [date, setDate] = useState(today);
  const [content, setContent] = useState<string | null>(null);

  const handleDate = (e: ChangeEvent<HTMLInputElement>) => setDate(e.target.value);

  const handleType = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setType(target.textContent);
  };

  const handleContentData = (e: ChangeEvent<HTMLInputElement>) => setContent(e.target.value);

  const handlePrice = () => {};

  const handleModalClose = () => {
    setModal(false);
  };

  // 추가 시 내역 데이터를 저장
  const handleContentAdd = async () => {
    await addDoc(collection(db, 'product'), {
      date: date,
      type: type,
      content: content,
      price: 1000000,
    });
  };

  // console.log(open);

  return (
    <div className="absolute inset-0 bg-black bg-opacity-30">
      <div className={`absolute left-0 bottom-0 w-full h-3/5 p-4 rounded-lg bg-white modalUp`}>
        <div className="flex flex-col gap-6">
          <div className="">
            <h3 className="px-1 font-medium">날짜</h3>
            <input type="date" className="relative modalInput mt-1 text-lg" value={date} onChange={handleDate} />
          </div>
          <div className="flex flex-col">
            <h3 className="px-1 font-medium">내용</h3>
            <div className="flex gap-4 mt-1 mb-3">
              {['수입', '지출'].map((item) => (
                <button
                  key={item}
                  className={`modalButton ${item === type && 'bg-indigo-500 text-white'}`}
                  onClick={handleType}
                >
                  {item}
                </button>
              ))}
            </div>
            <input type="text" className="modalInput" placeholder="내용을 적어주세요." onChange={handleContentData} />
          </div>
          <div>
            <h3 className="px-1 font-medium">금액</h3>
            <input type="number" className="modalInput mt-1" placeholder="금액을 적어주세요." onChange={handlePrice} />
          </div>
        </div>
        <div className="absolute w-full left-1/2 -translate-x-1/2 bottom-4 flex gap-4 px-4 font-medium">
          {['닫기', '추가하기'].map((item) => (
            <button
              key={item}
              type="button"
              className={`w-full py-2 rounded-lg ${item === '닫기' ? 'bg-gray-200' : 'bg-indigo-500 text-white'}`}
              onClick={item === '닫기' ? handleModalClose : handleContentAdd}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainModalCreate;
