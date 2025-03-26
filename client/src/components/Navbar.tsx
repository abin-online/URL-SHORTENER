import React, { useState, useEffect } from 'react';
import { LinkIcon, LogOut, History, X, User, ChevronDown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Swal from 'sweetalert2';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  let userId = Cookies.get('userId');
  let accessToken = Cookies.get('accessToken');
  let username = Cookies.get('user');

  useEffect(() => {
    if (!accessToken && !userId) {
      navigate('/login');
    }
  }, [accessToken, userId]);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You will be logged out!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout!'
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('userId');
        Cookies.remove('accessToken');
        navigate('/login');
      }
    });
  };

  return (
    <nav className="bg-white shadow-lg p-4 flex items-center justify-between relative">
      {/* Logo */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}> 
        <LinkIcon className="text-blue-600" size={40} />
        <span className="text-xl font-bold text-gray-700">URL SHORTNER</span>
      </div>

      {/* Desktop: Username + Dropdown */}
      <div className="hidden md:flex items-center gap-4 relative">
        {username && (
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full shadow-sm hover:bg-gray-200 transition"
            >
              <User className="text-gray-600" size={20} />
              <span className="text-gray-700 font-medium">{username}</span>
              <ChevronDown size={18} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-md rounded-lg flex flex-col py-2">
                <button
                  onClick={() => navigate('/history')}
                  className="px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <History className="mr-2" size={20} /> History
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <LogOut className="mr-2" size={20} /> Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden flex items-center text-gray-700"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <X size={30} /> : <User size={30} />}
      </button>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white shadow-md rounded-lg flex flex-col py-2 md:hidden">
          
          <button
            onClick={() => {
              navigate('/history');
              setMenuOpen(false);
            }}
            className="px-4 py-2 hover:bg-gray-200 flex items-center"
          >
            <History className="mr-2" size={20} /> History
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 hover:bg-gray-200 flex items-center"
          >
            <LogOut className="mr-2" size={20} /> Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;