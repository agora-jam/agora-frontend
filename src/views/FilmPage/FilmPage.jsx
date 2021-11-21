/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import useStore from '../../store/index.js';
import Agora from '../../contracts/agora.json';
import AgoraShare from '../../contracts/agoraShare.json';
import { agoraAddress, agoraShareAddress } from '../../../config.js';
import PropTypes from 'prop-types';
import { getMetadata } from '../../utils/storage';

const FilmPage = ({ location }) => {
  const { tokenId } = useParams();
  const { provider } = useStore((state) => state);
  const [movie, setMovie] = useState(location.state); // todo: uncomment

  const [filmStatus, setFilmStatus] = useState('active');
  const [transactions, setTransactions] = useState([]);

  const nftBreakdown = [
    'Deleted scenes NFT',
    'Script NFT',
    'Name on Credits',
    'Buyout payback',
    'Revenue share',
  ];

  const buyNft = async (amount) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const agoraShareContract = new ethers.Contract(
      agoraShareAddress,
      AgoraShare.abi,
      signer,
    );
    const price = await agoraShareContract.getToBuy(parseInt(tokenId), amount);
    await agoraShareContract.buyShareinFilm(parseInt(tokenId), price);
  };

  useEffect(() => {
    getMovieDetails(tokenId);
    getTransactions(tokenId);
  }, [provider]);

  const getMovieDetails = async () => {
    if (!provider) return;

    const agoraContract = new ethers.Contract(agoraAddress, Agora.abi, provider);
    const agoraShareContract = new ethers.Contract(
      agoraShareAddress,
      AgoraShare.abi,
      provider,
    );

    const metadataUrl = await agoraContract.getOneMovie(parseInt(tokenId));
    const metadata = await getMetadata(metadataUrl);

    const structure = await agoraShareContract.getSharedDropStruct(parseInt(tokenId)); // todo

    const sharesSold = structure[4].toNumber();
    const sharePrice = structure[6].toNumber();
    const amountRaised = sharesSold * sharePrice;

    const movie = { tokenId: parseInt(tokenId), amountRaised, ...metadata };
    setMovie(movie);

    if (movie.fundraisingAmount === parseInt(movie.amountRaised)) setFilmStatus('closed');
  };

  const getTransactions = async (id) => {
    const x = true;
    if (x) return; // todo: remove
    if (!provider) return;

    const agoraShareContract = new ethers.Contract(
      agoraShareAddress,
      AgoraShare.abi,
      provider,
    );
    const investors = await agoraShareContract.getFilmInvestors(parseInt(id));
    setTransactions(investors);
  };

  if (!movie) return null;

  return (
    <div className="w-11/12 mx-auto flex py-10">
      <main className="w-4/6">
        <div className="flex">
          <div className="w-1/3">
            <img src={movie.imageUrl} />
          </div>
          <div className="ml-9 flex-grow">
            <h1 className="font-bold text-3xl">{movie.name}</h1>
            <div className="text-sm	text-gray-500 mt-1 mb-5">{`${movie.genre} · ${movie.duration}m · ${movie.language} · ${movie.country}`}</div>
            <div className="flex w-full items-center">
              <Link to={`/watch/${movie.tokenId}`} className="btn btn-primary">
                Watch
              </Link>
              <button className="btn btn-secondary ml-2" onClick={() => buyNft(1)}>
                Invest
              </button>
              <div className="ml-2">100 token holders</div>
            </div>
          </div>
        </div>
        <div className="mt-10">{movie.description}</div>
      </main>
      <aside className="w-2/6">
        <div>
          <h4 className="font-bold text-lg mb-2">Token holder access</h4>
          <ul>
            {nftBreakdown.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
        <div></div>
      </aside>
    </div>
  );
};

FilmPage.propTypes = {
  location: PropTypes.object,
};

export default FilmPage;
