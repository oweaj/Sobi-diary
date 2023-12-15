import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import Main from './pages/Main/Main';

function App() {
  return (
    <div className="absolute w-[450px] h-full left-1/2 -translate-x-1/2 border border-gray-300 rounded-2xl shadow-xl bg-zinc-50">
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
