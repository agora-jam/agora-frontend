import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useStore from '../../store/index.js';
import axios from 'axios';
import { ethers } from 'ethers';
import Agora from '../../contracts/agora.json';
import AgoraShare from '../../contracts/agoraShare.json';
import { agoraAddress, agoraShareAddress } from '../../../config.js';
import Film from '../../components/Film';

const FilmList = () => {
  const { provider } = useStore((state) => state);
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState('not-loaded');

  useEffect(() => {
    loadNFTs();
  }, [provider]);

  const loadNFTs = async () => {
    if (!provider) return;

    const agoraContract = new ethers.Contract(agoraAddress, Agora.abi, provider);
    const agoraShareContract = new ethers.Contract(
      agoraShareAddress,
      AgoraShare.abi,
      provider,
    );

    const data = await agoraContract.getAllMovies();

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenId = i.tokenId.toNumber();
        const tokenUrl = await agoraContract.getOneMovie(tokenId);
        const meta = await axios.get(tokenUrl);
        const amountRaised = await agoraShareContract.getSharedDropStruct(tokenId);
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
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-18 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">
            New film submissions
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {nfts.map((item, i) => {
              return (
                <div key={i} className="m-4">
                  <Link to={{ pathname: `film/${item.tokenId}`, state: item }}>
                    <Film
                      imageUrl={item.imageUrl}
                      name={item.name}
                      country={item.country}
                      duration={item.duration}
                      amountRaised={item.amountRaised}
                    />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmList;
