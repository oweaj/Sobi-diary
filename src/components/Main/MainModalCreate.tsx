import { useState, Dispatch, SetStateAction } from 'react';
import { RxCross2 } from 'react-icons/rx';

interface modalState {
  setModal: Dispatch<SetStateAction<boolean>>;
}

const MainModalCreate = ({ setModal }: modalState) => {
  const [close, setClose] = useState(false);

  const handleModalClose = () => {
    setModal(!close);
    setClose(true);
  };

  const handleModalCheck = () => {
    console.log('추가 작성 완료');
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-40">
      <div
        className={`absolute left-0 bottom-0 w-full h-[620px] rounded-lg overflow-hidden bg-white ${
          close ? 'animate-[modal-down_500ms_ease-in-out]' : 'animate-[modal-up_500ms_ease-in-out]'
        }`}
      >
        <div>
          <input type="date" className="w-full border" />
        </div>
        <div className="absolute w-full left-1/2 -translate-x-1/2 bottom-2 flex gap-4 px-4 font-medium">
          <button
            type="button"
            className="w-full py-2 rounded-lg bg-gray-200 transition-all"
            onClick={handleModalClose}
          >
            닫기
          </button>
          <button
            type="button"
            className="w-full py-2 rounded-lg bg-gray-200 transition-all"
            onClick={handleModalCheck}
          >
            추가 하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainModalCreate;
