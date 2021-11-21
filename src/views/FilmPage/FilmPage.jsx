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
  const [movie, setMovie] = useState(location.state);
  const [filmStatus, setFilmStatus] = useState('active');
  const [transactions, setTransactions] = useState([]);

  const nftBreakdown = [
    'Deleted scenes NFT',
    'Script NFT',
    'Name on Credits',
    'Buyout payback',
    'Revenue share',
  ];

  const buyNft = async (nft, amount) => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const agoraShareContract = new ethers.Contract(
      agoraShareAddress,
      AgoraShare.abi,
      signer,
    );
    const price = await agoraShareContract.getToBuy(nft.id, amount);
    await agoraShareContract.buyShareinFilm(nft.id, price);
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
    <div>
      <h1>{movie.name}</h1>
      <Link to={`/watch/${movie.tokenId}`}>
        <button
          className="btn btn-primary btn-active rounded-none	"
          role="button"
          aria-pressed="true"
        >
          Watch
        </button>
      </Link>
      {filmStatus === 'active' && (
        <div>
          <h3>Token holder access</h3>
          {nftBreakdown.map((item, i) => {
            return <div key={i}>{item}</div>;
          })}
        </div>
      )}
      {transactions.map((item, i) => {
        return <div key={i}>{item}</div>;
      })}
      <button
        onClick={() => {
          buyNft(movie);
        }}
      >
        Invest
      </button>
    </div>
  );
};

FilmPage.propTypes = {
  location: PropTypes.object,
};

export default FilmPage;
