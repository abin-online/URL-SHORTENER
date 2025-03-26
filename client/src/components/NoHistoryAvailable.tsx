import { useNavigate } from "react-router-dom";
import { Ghost } from "lucide-react";

const NoHistoryAvailable = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      {/* Icon or Illustration */}
      <Ghost size={80} className="text-gray-400 mb-4 animate-pulse" />

      {/* Title */}
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        No History Found!
      </h2>

      {/* Subtitle */}
      <p className="text-gray-500 mb-6">
        Looks like you haven't shortened any URLs yet. Start now!
      </p>

      {/* Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        🔗 Shorten a URL
      </button>
    </div>
  );
};

export default NoHistoryAvailable;
