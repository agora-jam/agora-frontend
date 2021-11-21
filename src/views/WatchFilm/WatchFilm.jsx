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
  const { provider, signer } = useStore((state) => state);

  const loadVideo = async () => {
    try {
      if (!provider) return;

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

      const isAuthorized = await agoraShareContract.getAuthorizeViewing(
        parseInt(tokenId),
      );

      if (!isAuthorized) {
        setError({
          title: 'Unauthorized',
          message: 'You must purchase a film token to watch this content',
        });
        setIsLoading(false);
        return;
      }

      // Get metadata url
      const agoraContract = new ethers.Contract(agoraAddress, Agora.abi, provider);
      const metadataUrl = await agoraContract.getOneMovie(parseInt(tokenId));

      // Get movie metadata
      const metadata = await getMetadata(metadataUrl);
      setVideoUrl(metadata.videoUrl);

      // End function
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVideo();
  }, [provider]);

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
