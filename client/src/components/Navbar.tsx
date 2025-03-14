import React, { useEffect } from 'react';
import { LinkIcon, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  let userId = Cookies.get('userId');
  let accessToken = Cookies.get('accessToken');

  useEffect(() => {
    if (!accessToken && !userId) {
      navigate('/login');
    }
  }, [accessToken, userId]);

  const handleLogout = () => {
    Cookies.remove('userId');
    Cookies.remove('accessToken');
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-lg p-4 flex items-center justify-between">
      <LinkIcon className="text-black-600" size={50} />
      <button
        onClick={handleLogout}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105 flex items-center"
      >
        <LogOut className="mr-2" size={20} /> Logout
      </button>
    </nav>
  );
};

export default Navbar;
