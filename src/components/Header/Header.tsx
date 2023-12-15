import { FiLogOut } from 'react-icons/fi';

const Header = () => {
  const handleLogout = () => {
    alert('로그아웃');
  };

  return (
    <div className="flex items-center justify-center p-3 border-b border-gray-300">
      <h1 className="text-2xl font-medium">한 달 소비</h1>
      <button type="button" className="absolute right-3 p-1" onClick={handleLogout}>
        <FiLogOut className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Header;
