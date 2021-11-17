import React, { useEffect } from 'react';
import { ethers } from 'ethers';

import Router from './router';
import useStore from './store';

const App = () => {
  const { setProvider, setSigner } = useStore((state) => state);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    setProvider(provider);
    setSigner(signer);
  }, []);

  return <Router />;
};

export default App;
