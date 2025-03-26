import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import Cookies from 'js-cookie';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let userId = Cookies.get('userId');
  let accessToken = Cookies.get('accessToken');

  useEffect(() => {
    if (accessToken && userId) {
      navigate('/');
    }
  }, [accessToken, userId]);

  const validateInputs = () => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');

    if (!email.trim()) {
      setEmailError('Email is required.');
      toast.error('Email is required.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format.');
      toast.error('Invalid email format.');
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError('Password is required.');
      toast.error('Password is required.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters.');
      toast.error('Password must be at least 6 characters.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(import.meta.env.VITE_API_LOGIN, {
        email,
        password,
      });
    console.log(response.data)
      Cookies.set('accessToken', response.data.access_token);
      Cookies.set('userId', response.data.userId);
      Cookies.set('user', response.data.username);
      navigate('/');
      toast.success('Login successful!');
    } catch (error: any) { // Cast 'error' to 'any'
      if (error.response) {
        toast.error(error.response.data.message || 'Login failed. Please try again.');
      } else {
        toast.error('Something went wrong. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      <div className="w-full max-w-[400px] bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white mb-2">Login</h2>
            <p className="text-gray-300 font-medium">Enter your credentials to access your account</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="Enter E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 h-12 bg-white bg-opacity-20 border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 transition-all duration-200 ease-in-out"
                />
                <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-300" />
              </div>
              {emailError && <p className="text-red-400 text-sm">{emailError}</p>}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <input
                  id="password"
                  placeholder="Enter Password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 h-12 bg-white bg-opacity-20 border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 pr-10 transition-all duration-200 ease-in-out"
                />
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-300" />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-300 focus:outline-none hover:text-gray-100 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {passwordError && <p className="text-red-400 text-sm">{passwordError}</p>}
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-blue-500 text-white rounded-lg font-medium text-base hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={isLoading}
            >
              {isLoading ? <span>Signing in...</span> : 'Sign in'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-gray-300">Don't have an account? </span>
            <button type="button" onClick={() => navigate('/register')} className="text-blue-400 hover:text-blue-600 font-medium focus:outline-none transition-colors duration-200">
              Create account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
