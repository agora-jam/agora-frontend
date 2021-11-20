import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import useStore from '../store';

export default () => {
  const { setSigner, setAccount, setGenericProvider } = useStore((state) => state);

  const connectProvider = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    setGenericProvider(provider);
  };

  const connectWallet = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); // eslint-disable-line no-unused-vars
    const accounts = await provider.listAccounts();

    setAccount(accounts[0]);
    setSigner(signer);
  };

  const setWalletInfo = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(); // eslint-disable-line no-unused-vars
    const accounts = await provider.listAccounts();

    setAccount(accounts[0]);
    setSigner(signer);
  };

  const isWalletConnected = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const accounts = await provider.listAccounts();

    if (accounts.length === 0) {
      return false;
    } else {
      return true;
    }
  };

  return { connectWallet, connectProvider, isWalletConnected, setWalletInfo };
};
