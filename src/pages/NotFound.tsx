import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Gift } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
      </div>
      
      {/* Fixed Bottom Emblem - Always Visible */}
      <div className="fixed bottom-6 right-6 z-50 animate-pulse">
        <div className="relative group">
          {/* Outer glow ring */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 rounded-full animate-ping opacity-30"></div>
          
          {/* Main emblem */}
          <div className="relative bg-white rounded-full p-4 shadow-2xl border-3 border-gradient-to-br from-orange-300 to-red-400 hover:shadow-3xl transition-all duration-300 hover:scale-110">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 via-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg">
              <Gift className="h-8 w-8 text-white drop-shadow-lg" />
            </div>
            
            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-black text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                TukarHadiah
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
