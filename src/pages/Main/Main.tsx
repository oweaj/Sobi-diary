import Header from '../../components/Header/Header';
import MainTotal from '../../components/Main/MainTotal';
import MainContent from '../../components/Main/MainContent';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { CiSquarePlus } from 'react-icons/ci';
import MainModalCreate from '../../components/Main/MainModalCreate';

interface userInfo {
  id: string;
  name: string | null;
}

const Main = () => {
  const [user, setUser] = useState<userInfo | null>(null);
  const [modal, setModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [btnId, setBtnId] = useState('전체');

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ id: user.uid, name: user.displayName });
      }
    });
  }, [user?.id]);

  const handleModalOpen = () => {
    setModal(true);
    setDeleteMode(false);
  };

  const handleDelete = () => setDeleteMode(!deleteMode);

  return (
    <>
      <Header />
      <div className="flex h-full flex-col gap-3 px-3 py-4">
        <div className="flex flex-col gap-4">
          <div>
            <span className="text-lg">😎</span> 반갑습니다.
            <span className="text-lg font-semibold text-sky-500"> {user?.name ? user.name : '사용자'}</span>
            님 <br /> 수입 및 지출 내역을 확인해보세요.
          </div>
          <MainTotal userId={user?.id} />
        </div>
        <div className="flex items-center gap-3 border-b border-gray-400 pb-3">
          {['전체', '수입', '지출', '삭제'].map((item) => (
            <button
              key={item}
              type="button"
              className={`filterButton ${item === btnId && 'bg-gray-500 text-white'}
              ${item === '삭제' && `absolute right-4 ${deleteMode && 'bg-gray-500 text-white'}`}`}
              onClick={item === '삭제' ? handleDelete : () => setBtnId(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <MainContent userId={user?.id} deleteMode={deleteMode} setDeleteMode={setDeleteMode} btnId={btnId} />
      </div>
      <button
        type="button"
        className="absolute left-1/2 -translate-x-1/2 bottom-1 text-gray-800 hover:text-green-500 transition-all"
        onClick={handleModalOpen}
      >
        <CiSquarePlus className="w-12 h-12" />
      </button>
      <MainModalCreate modal={modal} setModal={setModal} userId={user?.id} />
    </>
  );
};

export default Main;
