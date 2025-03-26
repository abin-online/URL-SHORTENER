import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";
import Cookies from "js-cookie";
import NoHistoryAvailable from "./NoHistoryAvailable";

interface HistoryItem {
  _id: string;
  originalUrl: string;
  shortUrl: string;
  createdAt: string;
}

const HistoryList: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<{ 
    items: HistoryItem[]; 
    totalPages: number; 
    currentPage: number; 
    hasNextPage: boolean; 
    hasPrevPage: boolean 
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const page = Number(searchParams.get("page")) || 1;
  const limit = 5; // Adjust items per page for better readability
  const userId = Cookies.get('userId');

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_HISTORY}/${userId}?page=${page}&limit=${limit}`);
      
        setData(res.data);
      } catch (err) {
        setError("Error loading history");
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  if (loading) return <div className="flex justify-center items-center h-screen"><span className="text-lg font-semibold">Loading...</span></div>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <>
    <Navbar/>
    <div className="max-w-3xl mx-auto p-6">
     
      <h2 className="text-2xl font-bold text-center mb-4">URL Shortener History</h2>
      <div className="space-y-4">
        {data?.items.length === 0 ? <NoHistoryAvailable/> : 
        data?.items.map((item) => (
          <div key={item._id} className="border p-4 rounded-lg shadow-md bg-white">
            <p className="text-sm text-gray-500">Created: {new Date(item.createdAt).toLocaleString()}</p>
            <p className="text-blue-600 break-words">
              <strong>Original:</strong> 
              <a href={item.originalUrl} target="_blank" rel="noopener noreferrer" className="underline">
                {item.originalUrl}
              </a>
            </p>
            <p className="text-green-600 break-words">
              <strong>Short:</strong> 
              <a href={item.shortUrl} target="_blank" rel="noopener noreferrer" className="underline">
                {item.shortUrl}
              </a>
            </p>
          </div>
        ))
        }
        
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <button 
          onClick={() => handlePageChange(page - 1)} 
          disabled={!data?.hasPrevPage}
          className={`px-4 py-2 rounded-lg ${data?.hasPrevPage ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Prev
        </button>
        <span className="text-lg font-semibold">Page {data?.currentPage} of {data?.totalPages}</span>
        <button 
          onClick={() => handlePageChange(page + 1)} 
          disabled={!data?.hasNextPage}
          className={`px-4 py-2 rounded-lg ${data?.hasNextPage ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
        >
          Next
        </button>
      </div>
    </div>
    </>
  );
};

export default HistoryList;
