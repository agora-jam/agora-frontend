import React, { useEffect } from 'react';
import { ethers } from 'ethers';

import Router from './router';
import useStore from './store';

const App = () => {
  const { setProvider, setSigner, setPublicProvider } = useStore((state) => state);

  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const publicProvider = new ethers.providers.JsonRpcProvider();

    setProvider(provider);
    setSigner(signer);
    setPublicProvider(publicProvider);
  }, []);

  return <Router />;
};

export default App;
