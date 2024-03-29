import Header from '../../components/Header/Header';
import MainContent from '../../components/Main/MainContent';
import { useState } from 'react';
import { CiSquarePlus } from 'react-icons/ci';
import MainModalCreate from '../../components/Main/MainModalCreate';
import { FaRegChartBar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import useGetDoc from '../../hooks/useGetDoc';

const Main = () => {
  const getUser = localStorage.getItem('user');
  const userData = getUser ? JSON.parse(getUser) : null;
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [deleteMode, setDeleteMode] = useState(false);
  const [btnId, setBtnId] = useState('전체');
  const { docList } = useGetDoc(userData?.uid, btnId);
  const plusTotal = useGetDoc(userData?.uid, '수입').total;
  const minusTotal = useGetDoc(userData?.uid, '지출').total;

  const handleGoChart = () => {
    const sobiCheck = docList.filter((item) => item.detailType);
    if (sobiCheck.length) {
      navigate('/chart');
    } else {
      alert('소비 내역이 없으면 차트를 볼 수 없습니다.');
    }
  };

  const handleModalOpen = () => {
    setModal(true);
    setDeleteMode(false);
  };

  const handleDelete = () => {
    if (docList.length) {
      setDeleteMode(!deleteMode);
    } else {
      alert('내역이 있으면 삭제가 가능합니다.');
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col h-full gap-3 px-3">
        <div className="flex items-center justify-between pt-3">
          <div>
            <span className="text-lg">😎</span> 반갑습니다.
            <span className="text-lg font-semibold text-sky-500"> {userData?.name ?? '사용자'}</span>
            님 <br /> 수입 및 지출 내역을 확인해보세요.
          </div>
          <div className="flex items-center gap-1 mainButton" onClick={handleGoChart}>
            <FaRegChartBar />
            <span>소비 차트</span>
          </div>
        </div>
        <div className="py-4 text-center bg-white border border-gray-400 rounded-xl">
          <div className="pb-5 text-xl font-medium">
            총 <span className="text-2xl font-semibold">{(plusTotal + -minusTotal).toLocaleString()}</span>원
          </div>
          <div className="flex items-center justify-evenly">
            {['수입', '지출'].map((item) => (
              <div key={item} className={`flex-grow text-lg ${item === '수입' && 'border-r border-gray-400'}`}>
                <p className="mb-1">{item}</p>
                <p className={`font-medium ${item === '수입' ? 'text-sky-500' : 'text-red-400'}`}>
                  {item === '수입' ? plusTotal.toLocaleString() : minusTotal.toLocaleString()}원
                </p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-3 pb-3 border-b border-gray-400">
          {['전체', '수입', '지출', '삭제'].map((item) => (
            <button
              key={item}
              type="button"
              className={`mainButton ${item === btnId && 'bg-gray-500 text-white'}
              ${item === '삭제' && `absolute right-4 ${deleteMode && 'bg-gray-500 text-white'}`}`}
              onClick={item === '삭제' ? handleDelete : () => setBtnId(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <MainContent userData={userData} deleteMode={deleteMode} setDeleteMode={setDeleteMode} btnId={btnId} />
      </div>
      <div className="absolute bottom-0 flex -translate-x-1/2 left-1/2">
        <button type="button" className="text-gray-800 transition-all hover:text-green-500" onClick={handleModalOpen}>
          <CiSquarePlus className="w-12 h-12" />
        </button>
      </div>
      <MainModalCreate userData={userData} modal={modal} setModal={setModal} />
    </>
  );
};

export default Main;
