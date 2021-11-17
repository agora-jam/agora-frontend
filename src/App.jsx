import React from 'react';
import { ethers } from 'ethers';

const App = () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();

  const getInfo = async () => {
    const block = await provider.getBlock(13631476);

    const balance = await provider.getBalance('Ethermine');

    const num = await provider.getBlockNumber();

    return block;
  };

  const result = getInfo().then((res) => console.log(res));

  return (
    <div id="app-wrapper">
      <h1>Agora</h1>
    </div>
  );
};

export default App;
