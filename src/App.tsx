import { Route, Routes, useNavigate } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import Main from './pages/Main/Main';
import Chart from './pages/Chart/Chart';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userDataString = JSON.stringify({ uid: user.uid, name: user.displayName });
        localStorage.setItem('user', userDataString);
      } else {
        navigate('/');
      }
    });
  }, []);

  return (
    <div className="fixed w-[25rem] h-full left-1/2 -translate-x-1/2 border border-gray-400 rounded-2xl shadow-xl overflow-hidden">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/main" element={<Main />} />
        <Route path="/chart" element={<Chart />} />
      </Routes>
    </div>
  );
}

export default App;
