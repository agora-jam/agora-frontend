import React from 'react';
import { Link } from 'react-router-dom';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import useStore from '../../store/index.js';
import Agora from '../../contracts/agora.json';
import AgoraShare from '../../contracts/agoraShare.json';
import { agoraAddress, agoraShareAddress } from '../../../config.js';
import Film from '../../components/Film';
import { getMetadata } from '../../utils/storage';

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
      data.map(async (ele) => {
        const [id, url] = ele;

        const tokenId = id.toNumber();
        try {
          const metadata = await getMetadata(url);

          const structure = await agoraShareContract.getSharedDropStruct(tokenId); // todo
          const sharesSold = structure[4].toNumber();
          const sharePrice = structure[6].toNumber();
          const amountRaised = sharesSold * sharePrice;

          const movie = { tokenId, amountRaised, ...metadata };
          return movie;
        } catch (error) {
          console.error(error); // eslint-disable-line
          return {};
        }
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
