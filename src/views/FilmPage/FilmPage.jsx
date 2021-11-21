import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Web3Modal from 'web3modal';
import ethers from 'ethers';
import useStore from '../../store/index.js';
import axios from 'axios';
import Agora from '../../contracts/agora.json';
import AgoraShare from '../../contracts.agoraShare.json';
import { agoraAddress, agoraShareAddress } from '../../../config.js';
import PropTypes from 'prop-types';

const FilmPage = ({ location }) => {
  const { filmId } = useParams();
  const { genericProvider } = useStore((state) => state);
  const [movie, setMovie] = useState(location.state);
  const [filmStatus, setFilmStatus] = useState('active');
  const [transactions, setTransactions] = useState(null);

  if (movie.fundraisingAmount === movie.amountRaised) setFilmStatus('closed');

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
    getMovieDetails(filmId);
    getTransactions(filmId);
  }, []);

  const getMovieDetails = async (id) => {
    const agoraContract = new ethers.Contract(agoraAddress, Agora.abi, genericProvider);

    const tokenUrl = await agoraContract.getOneMovie(id);
    const meta = await axios.get(tokenUrl);
    setMovie({
      tokenId: id.toNumber(),
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
    });
  };

  const getTransactions = async (id) => {
    const agoraShareContract = new ethers.Contract(
      agoraShareAddress,
      AgoraShare.abi,
      genericProvider,
    );
    const investors = await agoraShareContract.getFilmInvestors(id);
    setTransactions(investors);
  };

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
