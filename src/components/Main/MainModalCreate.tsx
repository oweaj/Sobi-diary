import { useState, Dispatch, SetStateAction } from 'react';
import { RxCross2 } from 'react-icons/rx';

interface modalState {
  open: boolean;
  setModal: Dispatch<SetStateAction<boolean>>;
}

const MainModalCreate = ({ open, setModal }: modalState) => {
  const modalButtonList = ['닫기', '추가하기'];
  const contentButtonList = ['수입', '지출'];
  const [close, setClose] = useState(false);
  const [pick, setPick] = useState<string | null>(null);

  const handlePick = (item: string) => {
    setPick(item);
    console.log('수입 및 지출 선택');
  };

  console.log(pick);

  const handleModalClose = () => {
    setClose(true);
    setModal(false);
  };

  const handleModalCheck = () => {
    console.log('추가 작성 완료');
  };

  return (
    <div className="absolute inset-0 bg-black bg-opacity-30">
      <div className={`absolute left-0 bottom-0 w-full h-[500px] p-4 rounded-lg overflow-hidden bg-white modalUp`}>
        <div className="flex flex-col gap-6">
          <div>
            <h3 className="font-medium">날짜</h3>
            <input type="date" className="modalInput" />
          </div>
          <div className="flex flex-col">
            <h3 className="font-medium">내용</h3>
            <div className="flex gap-4 mb-3">
              {contentButtonList.map((item) => (
                <button
                  key={item}
                  className={`modalButton ${item === pick && 'bg-indigo-500 text-white'}`}
                  onClick={() => handlePick(item)}
                >
                  {item}
                </button>
              ))}
            </div>
            <input type="text" className="modalInput" placeholder="내용을 적어주세요." />
          </div>
          <div>
            <h3 className="font-medium">금액</h3>
            <input type="text" className="modalInput" placeholder="금액을 적어주세요." />
          </div>
        </div>
        <div className="absolute w-full left-1/2 -translate-x-1/2 bottom-4 flex gap-4 px-4 font-medium">
          {modalButtonList.map((item) => (
            <button
              key={item}
              type="button"
              className={`w-full py-2 rounded-lg ${item === '닫기' ? 'bg-gray-200' : 'bg-indigo-500 text-white'}`}
              onClick={item === '닫기' ? handleModalClose : handleModalCheck}
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
