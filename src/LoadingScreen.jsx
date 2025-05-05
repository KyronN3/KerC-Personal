import React from 'react';

const LoadingScreen = ({ message = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center backdrop-blur-sm bg-opacity-70 z-50">
      <div className="flex flex-col items-center p-6 rounded-lg">
        {/* Simple Spinner */}
        <div className="w-12 h-12 mb-4">
          <div className="w-full h-full border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin"></div>
        </div>

        {/* Loading text */}
        <h2 className="text-base font-medium text-gray-700 mb-2">{message}</h2>

        {/* Loading indicator dots */}
        <div className="flex space-x-2">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;