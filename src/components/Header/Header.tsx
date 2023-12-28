import { FiLogOut } from 'react-icons/fi';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const { pathname } = window.location;
  const headerTitle = pathname.slice(1);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
      alert('로그아웃 되었습니다.');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center p-2 border-b border-gray-300">
      <h1 className="text-[26px] font-bold">{headerTitle === 'chart' ? 'Chart' : '씀.'}</h1>
      <button type="button" className="absolute right-3 p-1" onClick={handleLogout}>
        <FiLogOut className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Header;
