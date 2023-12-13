import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn/SignIn';
import Main from './pages/Main/Main';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
