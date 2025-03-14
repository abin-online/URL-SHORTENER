import React, { useState } from 'react';
import axios from 'axios';
import { Copy, LinkIcon, Loader2, Check } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './Navbar';

const UrlShortener: React.FC = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const isValidUrl = (input: string) => {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)?' + // protocol
      '((([a-zA-Z0-9\\-]+\\.)+[a-zA-Z]{2,})|' + // domain name
      'localhost|' + // localhost
      '\\d{1,3}(\\.\\d{1,3}){3})' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-zA-Z0-9@:%_\\+.~#?&//=]*)?$', // port and path
      'i'
    );
    return !!urlPattern.test(input);
  };



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidUrl(url)) {
      toast.error('Please enter a valid URL!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(import.meta.env.VITE_API_URL_SHORT, {
        originalUrl: url,
      });
      setShortUrl(response.data.shortUrl);
      toast.success('URL shortened successfully!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } catch (error) {
      console.error('Error shortening URL:', error);
      toast.error('Something went wrong. Please try again!', {
        position: 'top-right',
        autoClose: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-gray-100 to-gray-500 ">
      <Navbar />
       <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-lg bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-3xl font-semibold text-center text-gray-900 mb-6">Shorten Your URL</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <input
              type="text"
              className="w-full px-5 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:outline-none text-gray-700 text-lg"
              placeholder="Paste your long URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <LinkIcon className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={22} />
          </div>
          <button
            type="submit"
            className={`w-full py-3 text-lg font-semibold rounded-lg transition-all focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 
              ${isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-600 hover:bg-purple-700 text-white"}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <Loader2 className="animate-spin mr-2" size={22} /> Shortening...
              </span>
            ) : (
              "Shorten URL"
            )}
          </button>
        </form>

        {shortUrl && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-inner">
            <p className="text-sm font-medium text-gray-700 mb-2">Your Shortened URL:</p>
            <div className="flex items-center bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 flex-grow truncate text-lg"
              >
                {shortUrl}
              </a>
              <button
                onClick={copyToClipboard}
                className="p-2 text-purple-600 hover:text-purple-800 focus:outline-none"
                title="Copy to clipboard"
              >
                {copied ? <Check size={22} className="text-green-500" /> : <Copy size={22} />}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
      <ToastContainer />
    </div>
  );
};

export default UrlShortener;
