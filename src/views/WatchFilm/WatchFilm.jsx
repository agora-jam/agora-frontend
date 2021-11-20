/* eslint-disable */ //todo: remove
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import NotAuthorized from './components/NotAuthorized';
import NotFound from './components/NotFound';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';

import { getMetadata } from '../../utils/storage';

const WatchFilm = () => {
  const { tokenId } = useParams();
  const [videoUrl, setVideoUrl] = useState(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadVideo = async () => {
    setIsLoading(true);

    try {
      // Get current wallet
      // Determine if current wallet owns at least one movie token
      // contract.getVideoURI(tokenId)
      // If so, get the movie metadata => axios
    } catch (error) {
      console.error(error); // eslint-disable-line no-console
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadVideo();
  }, []);

  // todo: uncomment
  // if (isLoading) return <p>Loading...</p>;
  // if (!isAuthorized) return <NotAuthorized />;
  // if (!videoUrl) return <NotFound />;

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
