import React from "react";

const TypingAnimation: React.FC = () => {
  return (
    <div className="flex items-center space-x-2 bg-customBlue text-left rounded-t-lg rounded-br-lg">
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-50 animate-pulse"></div>
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-50 animate-pulse delay-150"></div>
      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-800 to-gray-50 animate-pulse delay-700"></div>
    </div>
  );
};

export default TypingAnimation;