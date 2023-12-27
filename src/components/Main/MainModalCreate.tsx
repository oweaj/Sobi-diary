import { MouseEvent, Dispatch, SetStateAction, useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import useInput from '../../hooks/useInput';

interface modalState {
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
  userId: string | undefined;
}

const MainModalCreate = ({ modal, setModal, userId }: modalState) => {
  const [type, setType] = useState<string | null>(null);
  const today = new Date();
  const currentTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const date = useInput();
  const content = useInput();
  const price = useInput();

  const handleType = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setType(target.textContent);
  };

  const handleModalClose = () => {
    setType(null);
    date.onReset();
    content.onReset();
    price.onReset();
    setModal(false);
  };

  // 추가 시 사용자별 입력한 데이터를 저장
  const handleContentAdd = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (type && content.data && price.data) {
      await addDoc(collection(db, `user/${userId}/user-diary`), {
        date: `${date.data} ${currentTime}`,
        type: type,
        content: content.data,
        price: price.data,
      });
      alert('내역이 추가되었습니다.');
      handleModalClose();
    } else {
      alert('해당 내용을 알맞게 입력해 주세요.');
    }
  };

  return (
    <>
      {modal && <div className="absolute inset-0 bg-black bg-opacity-30"></div>}
      <div className={`modalStyle ${modal && 'bottom-0'} `}>
        <form className="flex flex-col gap-6">
          <div>
            <label htmlFor="date" className="modalTypeName">
              날짜
            </label>
            <input
              type="date"
              id="date"
              className="relative modalInput mt-1 text-lg"
              value={date.data}
              onChange={(e) => date.onChange(e, 'date')}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="content" className="modalTypeName">
              내용
            </label>
            <div className="flex gap-4 mt-1 mb-3">
              {['수입', '지출'].map((item) => (
                <button key={item} className={`modalButton ${item === type && 'bg-indigo-500 text-white'}`} onClick={handleType}>
                  {item}
                </button>
              ))}
            </div>
            <input
              type="text"
              id="content"
              className="modalInput"
              placeholder="내용을 적어주세요.(최대 12자)"
              maxLength={12}
              value={content.data}
              onChange={(e) => content.onChange(e, 'content')}
              required
            />
          </div>
          <div>
            <label htmlFor="price" className="modalTypeName">
              금액
            </label>
            <input
              type="text"
              id="price"
              className="modalInput mt-1"
              placeholder="금액을 적어주세요.(숫자만 최대 8자)"
              onChange={(e) => price.onChange(e, 'price')}
              value={price.data}
              maxLength={10}
              required
            />
          </div>
          <div className="absolute w-full left-1/2 -translate-x-1/2 bottom-4 flex gap-4 px-4 font-medium">
            {['닫기', '추가하기'].map((item) => (
              <button
                key={item}
                type={item === '닫기' ? 'button' : 'submit'}
                className={`w-full py-2 rounded-lg ${item === '닫기' ? 'bg-gray-200' : 'bg-indigo-500 text-white'}`}
                onClick={item === '닫기' ? handleModalClose : handleContentAdd}
              >
                {item}
              </button>
            ))}
          </div>
        </form>
      </div>
    </>
  );
};

export default MainModalCreate;
