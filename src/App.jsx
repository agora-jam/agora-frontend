import React from 'react';
import { ethers } from 'ethers';

const App = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const getInfo = async () => {
    const block = await provider.getBlock(13631476);

    const num = await provider.getBlockNumber();

    return block;
  };

  const result = getInfo().then((res) => console.log(res));

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <div>
        <div className="text-xl font-medium text-black">Agora</div>
        <p className="text-gray-500">The first film festival dapp</p>
      </div>
    </div>
  );
};

export default App;
