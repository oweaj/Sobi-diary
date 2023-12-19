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

  console.log(modal);

  return (
    <div>
      <Header />
      <div className="flex flex-col px-3 py-6">
        <div className="flex flex-col gap-6 border-b border-gray-300">
          <div>
            <span className="text-lg">😎</span> 반갑습니다.
            <span className="text-lg font-semibold text-sky-500"> {userName ? userName : '사용자'}</span>
            님 <br /> 한 달간 수입 및 지출 내역을 확인하세요.
          </div>
          <MainTotal />
          <div>케러셀 예정</div>
        </div>
        <MainContent />
        <button
          type="button"
          className="absolute left-1/2 -translate-x-1/2 bottom-3 text-gray-600 hover:text-green-500 transition-all"
          onClick={handleCreate}
        >
          <CiSquarePlus className="w-12 h-12" />
        </button>
        {modal && <MainModalCreate open={modal} setModal={setModal} />}
      </div>
    </div>
  );
};

export default Main;
