import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import Main from './pages/Main/Main';

function App() {
  return (
    <div className="fixed w-[25rem] h-full left-1/2 -translate-x-1/2 border border-gray-300 rounded-2xl shadow-xl overflow-hidden">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
