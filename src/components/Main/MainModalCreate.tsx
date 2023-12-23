import { MouseEvent, Dispatch, SetStateAction, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import useInput from '../../hook/useInput';

interface modalState {
  setModal: Dispatch<SetStateAction<boolean>>;
  userId: string | undefined;
}

const MainModalCreate = ({ setModal, userId }: modalState) => {
  const [type, setType] = useState<string | null>(null);
  const addDate = new Date().toISOString();
  const date = useInput();
  const content = useInput();
  const price = useInput();

  const handleType = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    setType(target.textContent);
  };

  // 모달 닫는 애니메이션 수정하기
  const handleModalClose = () => {
    setModal(false);
  };

  // 추가 시 사용자별 입력한 데이터를 저장
  const handleContentAdd = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (type && content.data && price.data) {
      await addDoc(collection(db, `user/${userId}/user-diary`), {
        date: addDate,
        type: type,
        content: content.data,
        price: price.data,
      });
      alert('내역이 추가되었습니다.');
      setModal(false);
    } else {
      alert('해당 내용을 알맞게 입력해 주세요.');
    }
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-30">
      <div className={`absolute left-0 bottom-0 w-full h-3/5 p-4 rounded-lg bg-white modalUp`}>
        <form className="flex flex-col gap-6">
          <div className="">
            <h3 className="modalTypeName">날짜</h3>
            <input type="date" id="date" className="relative modalInput mt-1 text-lg" onChange={date.onChange} />
          </div>
          <div className="flex flex-col">
            <h3 className="modalTypeName">내용</h3>
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
            <input
              type="text"
              id="content"
              className="modalInput"
              placeholder="내용을 적어주세요.(최대 12자)"
              maxLength={12}
              onChange={content.onChange}
              required
            />
          </div>
          <div>
            <h3 className="modalTypeName">금액</h3>
            <input
              type="number"
              id="price"
              className="modalInput mt-1"
              placeholder="금액을 적어주세요.(숫자만 가능)"
              onChange={price.onChange}
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
    </div>
  );
};

export default MainModalCreate;
