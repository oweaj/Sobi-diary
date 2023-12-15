import Header from '../../components/Header/Header';
import MainTotal from '../../components/Main/MainTotal';
import MainContent from '../../components/Main/MainContent';
import { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';

const Main = () => {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
        console.log(user);
      }
    });
  }, []);

  return (
    <div>
      <Header />
      <div className="flex flex-col gap-6 px-3 py-6">
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
      </div>
    </div>
  );
};

export default Main;
