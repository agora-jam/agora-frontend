import React, { useEffect } from 'react';
import Router from './router';
import useWallet from './hooks/useWallet';

const App = () => {
  const { setWalletInfo, isWalletConnected, connectProvider } = useWallet();

  useEffect(async () => {
    const isConnected = await isWalletConnected();

    if (isConnected) {
      setWalletInfo();
    } else {
      connectProvider();
    }
  }, []);

  return (
    <div className="h-screen w-screen flex flex-col">
      <Router />
    </div>
  );
};

export default App;
