import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import Main from './pages/Main/Main';
import Chart from './pages/Chart/Chart';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

interface userInfo {
  id: string;
  name: string | null;
}

function App() {
  const [user, setUser] = useState<userInfo | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('main');
        setUser({ id: user.uid, name: user.displayName });
      } else {
        navigate('/');
      }
    });
  }, [user?.id]);

  return (
    <div className="fixed w-[25rem] h-full left-1/2 -translate-x-1/2 border border-gray-400 rounded-2xl shadow-xl overflow-hidden">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/main" element={<Main user={user} />} />
        <Route path="/chart" element={<Chart user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
