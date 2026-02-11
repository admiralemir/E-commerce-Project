import React from "react";

const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center space-y-6">
        
        <h1 className="text-2xl font-bold tracking-widest text-black animate-pulse">
          ZALORA
        </h1>

        <div className="relative w-40 h-[2px] bg-gray-200 overflow-hidden">
          <div className="absolute left-0 top-0 h-full w-1/3 bg-black animate-loading-bar"></div>
        </div>

        <p className="text-xs uppercase tracking-widest text-gray-500">
          Loading your experience...
        </p>
      </div>
    </div>
  );
};

export default LoadingOverlay;
