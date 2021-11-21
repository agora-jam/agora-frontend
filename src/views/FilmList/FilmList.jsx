import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useStore from '../../store/index.js';
import axios from 'axios';
import { ethers } from 'ethers';
import Agora from '../../contracts/agora.json';
import AgoraShare from '../../contracts.agoraShare.json';

import { agoraAddress, agoraShareAddress } from '../../../config.js';

import mockData from './mockData';

const FilmList = () => {
  const { genericProvider } = useStore((state) => state);
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    const agoraContract = new ethers.Contract(agoraAddress, Agora.abi, genericProvider);
    const agoraShareContract = new ethers.Contract(
      agoraShareAddress,
      AgoraShare.abi,
      genericProvider,
    );

    const data = await agoraContract.getAllMovies();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUrl = await agoraContract.getOneMovie(i.tokenId);
        const meta = await axios.get(tokenUrl);
        const amountRaised = await agoraShareContract.getSharedDropStruct(i.tokenId);
        const item = {
          tokenId: i.tokenId.toNumber(),
          amountRaised,
          video: meta.data.video,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
          genre: meta.data.genre,
          language: meta.data.language,
          country: meta.data.country,
          duration: meta.data.duration,
          imageUrl: meta.data.imageUrl,
          videoUrl: meta.data.videoUrl,
          fundraisingAmount: meta.data.fundraisingAmount,
          numberOfTokens: meta.data.numberOfTokens,
          percentageGiven: meta.data.percentageGiven,
        };
        return item;
      }),
    );

    setNfts(items);
    setLoadingState('loaded');
  };

  if (loadingState === 'not-loaded') return <div>Loading...</div>;

  return (
    <div>
      {nfts.map((item, i) => {
        return (
          <div key={i}>
            <Link to={{ pathname: `film/${item.tokenId}`, state: item }}>
              <div>
                {item.name} {item.description}
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default FilmList;
