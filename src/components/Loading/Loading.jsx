import React from 'react';

const Loading = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
    </div>
  );
};

export default Loading;
