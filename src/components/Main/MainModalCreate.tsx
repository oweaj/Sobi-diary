import { MouseEvent, Dispatch, SetStateAction, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../firebase';
import useInput from '../../hooks/useInput';

interface userType {
  uid: string;
  name: string;
}

interface modalState {
  userData: userType;
  modal: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const MainModalCreate = ({ userData, modal, setModal }: modalState) => {
  const [type, setType] = useState<string | null>(null);
  const [detailMode, setDetailMode] = useState(false);
  const [detailType, setDetailType] = useState<string | null>(null);
  const [showInput, setShowInput] = useState(false);
  const today = new Date();
  const currentTime = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const date = useInput();
  const content = useInput();
  const price = useInput();

  const handleType = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    target.textContent === '지출' ? setDetailMode(true) : setDetailMode(false);
    setType(target.textContent);
  };

  const handleDetail = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLButtonElement;
    target.textContent === '기타' ? setShowInput(true) : setShowInput(false);
    setDetailType(target.textContent);
  };

  // 모달 닫을때 data가 있으면 초기화
  const handleModalClose = () => {
    if (type || detailType || date.data || content.data || price.data) {
      setType(null);
      setDetailType(null);
      date.onReset();
      content.onReset();
      price.onReset();
    }
    setModal(false);
    setDetailMode(false);
    setShowInput(false);
  };

  // 추가 시 사용자별 입력한 데이터를 저장
  const handleContentAdd = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const userAddData = {
      date: `${date.data} ${currentTime}`,
      type: type,
      detailType: detailType,
      content: content.data,
      price: price.data,
    };

    if (type === '지출') {
      userAddData.detailType = detailType;
      if (detailType === '기타') {
        userAddData.content = content.data;
      } else if (detailType) {
        userAddData.content = detailType;
      }
    }

    if ((type && date.data && content.data && price.data) || detailType) {
      await addDoc(collection(db, `user/${userData?.uid}/user-diary`), userAddData);
      alert('내역이 추가되었습니다.');
      handleModalClose();
    } else {
      alert('해당 내용을 알맞게 입력해 주세요.');
    }
  };

  return (
    <div>
      {modal && <div className="absolute inset-0 bg-black bg-opacity-30"></div>}
      <div className={`modalStyle ${modal && 'bottom-0'}`}>
        <form className="flex flex-col gap-6">
          <div>
            <label htmlFor="date" className="modalTypeName">
              날짜
            </label>
            <input
              type="date"
              id="date"
              className="relative mt-1 text-lg modalInput"
              value={date.data}
              onChange={(e) => date.onChange(e, 'date')}
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center">
              <label htmlFor="content" className="modalTypeName">
                내용
              </label>
              {detailMode && <p className="text-[12px] text-red-400">(세부내역 선택 필수)</p>}
            </div>
            <div className="flex gap-4 mt-1">
              {['수입', '지출'].map((item) => (
                <button
                  key={item}
                  type="button"
                  className={`modalButton ${item === type && 'bg-indigo-500 text-white'}`}
                  onClick={handleType}
                >
                  {item}
                </button>
              ))}
            </div>
            {detailMode && (
              <div className="flex gap-2 my-3">
                {['식당', '간식', '술', '쇼핑', '기타'].map((item) => (
                  <button
                    key={item}
                    type="button"
                    className={`modalButton ${item === detailType && 'bg-indigo-500 text-white'}`}
                    onClick={handleDetail}
                  >
                    {item}
                  </button>
                ))}
              </div>
            )}
            {(!detailMode || showInput) && (
              <input
                type="text"
                id="content"
                className={`modalInput ${!detailMode && 'mt-3'}`}
                placeholder="내용을 적어주세요.(최대 12자)"
                maxLength={12}
                value={content.data}
                onChange={(e) => content.onChange(e, 'content')}
                required
              />
            )}
          </div>
          <div>
            <div className="flex items-center">
              <label htmlFor="price" className="modalTypeName">
                금액
              </label>
              <p className="text-[12px] text-red-400">(8자 이하 숫자만 가능)</p>
            </div>
            <input
              type="text"
              id="price"
              className="mt-1 modalInput"
              placeholder="금액을 적어주세요."
              value={price.data}
              onChange={(e) => price.onChange(e, 'price')}
              maxLength={10}
              required
            />
          </div>
          <div className="absolute flex w-full gap-4 px-4 font-medium -translate-x-1/2 left-1/2 bottom-4">
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
