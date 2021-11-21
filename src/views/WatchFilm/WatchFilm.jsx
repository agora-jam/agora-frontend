import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ethers } from 'ethers';

import Loading from '../../components/Loading';
import ErrorPage from './components/ErrorPage';

import AgoraShare from '../../contracts/agoraShare.json';
import Agora from '../../contracts/agora.json';

import { agoraAddress, agoraShareAddress } from '../../../config';

import { getMetadata } from '../../utils/storage';
import useWallet from '../../hooks/useWallet';
import useStore from '../../store';

const WatchFilm = () => {
  const { tokenId } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const { isWalletConnected } = useWallet();
  const { signer } = useStore((state) => state);

  const loadVideo = async () => {
    try {
      // Determine if user is connected to MetaMask
      const isConnected = await isWalletConnected();
      if (!isConnected) {
        setError({ title: 'Unauthorized', message: 'Your wallet must be connected' });
        setIsLoading(false);
        return;
      }

      // Determine if current account owns at least one movie token
      const agoraShareContract = new ethers.Contract(
        agoraShareAddress,
        AgoraShare.abi,
        signer,
      );

      const shareTransaction = await agoraShareContract.getAuthorizeViewing(
        parseInt(tokenId),
      );

      const tx = await shareTransaction.wait();
      const event = tx.events[0];
      const value = event.args[2]; // todo: how to get the response from the event? (boolean)

      if (value === false) {
        setError({
          title: 'Unauthorized',
          message: 'You must purchase a film token to watch this content',
        });
        setIsLoading(false);
        return;
      }

      // Get movie url
      const agoraContract = new ethers.Contract(agoraAddress, Agora.abi, signer);
      const agoraTransaction = await agoraContract.getOneMovie(parseInt(tokenId));
      const tx2 = await agoraTransaction.wait();
      const event2 = tx2.events[0];
      const value2 = event2.args[2];

      // Get movie metadata
      const metadataUrl = value2;
      const metadata = await getMetadata(metadataUrl);
      setVideoUrl(metadata.videoUrl);

      setIsLoading(false);
      return;
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVideo();
  }, []);

  if (isLoading) return <Loading />;
  if (error) return <ErrorPage error={error} />;

  return (
    <div className="h-full w-full relative">
      <video
        controls
        src={videoUrl}
        className="absolute h-full w-full top-0 bottom-0 right-0 left-0"
      />
    </div>
  );
};

export default WatchFilm;
