import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({ username: '', email: '', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const userId = Cookies.get('userId');
    const accessToken = Cookies.get('accessToken');
    if (accessToken && userId) {
      navigate('/');
    }
  }, []);

  const validateInputs = () => {
    const newErrors = { username: '', email: '', password: '', confirmPassword: '' };

    if (!username.trim()) newErrors.username = 'Username is required.';
    if (!email.trim()) newErrors.email = 'Email is required.';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email format.';
    if (!password.trim()) newErrors.password = 'Password is required.';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (!confirmPassword.trim()) newErrors.confirmPassword = 'Confirm password is required.';
    else if (password !== confirmPassword) newErrors.confirmPassword = "Passwords don't match.";

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;

    setIsLoading(true);

    try {
      const response = await axios.post(import.meta.env.VITE_API_REGISTER, {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        navigate('/login');
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      alert('Registration failed. Please check your input and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-700 p-4">
      <div className="w-full max-w-[400px] bg-white bg-opacity-10 backdrop-blur-md rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white mb-2">Register</h2>
            <p className="text-gray-300 font-medium">Create an account to get started</p>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <div className="relative">
                <input
                  id="username"
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 h-12 bg-white bg-opacity-20 border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 transition-all duration-200 ease-in-out"
                />
              </div>
              {errors.username && <p className="text-red-400 text-sm">{errors.username}</p>}
            </div>
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
              </div>
              {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
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
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-300 focus:outline-none hover:text-gray-100 transition-colors duration-200"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-400 text-sm">{errors.password}</p>}
            </div>
            <div className="space-y-2">
              <div className="relative">
                <input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-2 h-12 bg-white bg-opacity-20 border border-gray-300 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pl-10 pr-10 transition-all duration-200 ease-in-out"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3.5 text-gray-300 focus:outline-none hover:text-gray-100 transition-colors duration-200"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-red-400 text-sm">{errors.confirmPassword}</p>}
            </div>
            <button
              type="submit"
              className="w-full h-12 bg-blue-500 text-white rounded-lg font-medium text-base hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              disabled={isLoading}
            >
              {isLoading ? <span>Registering...</span> : 'Register'}
            </button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-gray-300">Already have an account? </span>
            <button type="button" onClick={() => navigate('/login')} className="text-blue-400 hover:text-blue-600 font-medium focus:outline-none transition-colors duration-200">
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
