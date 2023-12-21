import Header from '../../components/Header/Header';
import MainTotal from '../../components/Main/MainTotal';
import MainContent from '../../components/Main/MainContent';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { CiSquarePlus } from 'react-icons/ci';
import MainModalCreate from '../../components/Main/MainModalCreate';

const Main = () => {
  const [userName, setUserName] = useState<string | null>(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
      }
    });
  }, []);

  const handleCreate = () => setModal(true);

  return (
    <>
      <Header />
      <div className="flex h-full flex-col gap-3 px-3 py-4">
        <div className="flex flex-col gap-4 border-gray-300">
          <div>
            <span className="text-lg">😎</span> 반갑습니다.
            <span className="text-lg font-semibold text-sky-500"> {userName ? userName : '사용자'}</span>
            님 <br /> 한 달간 수입 및 지출 내역을 확인하세요.
          </div>
          <MainTotal />
        </div>
        <div className="flex gap-3 border-b border-gray-300 pb-3">
          {['전체', '수입', '지출'].map((item) => (
            <button
              key={item}
              type="button"
              className="border border-gray-400 rounded-lg text-gray-500 py-1 px-2 hover:bg-gray-500 hover:text-white"
            >
              {item}
            </button>
          ))}
        </div>
        <MainContent />
      </div>
      <button
        type="button"
        className="absolute left-1/2 -translate-x-1/2 bottom-1 text-gray-800 hover:text-green-500 transition-all"
        onClick={handleCreate}
      >
        <CiSquarePlus className="w-12 h-12" />
      </button>
      {modal && <MainModalCreate open={modal} setModal={setModal} />}
    </>
  );
};

export default Main;
