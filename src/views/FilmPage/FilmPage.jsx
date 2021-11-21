import React from 'react';
// import { useParams } from 'react-router-dom';
// import { Link } from 'react-router-dom';

// import { useEffect, useState } from 'react';
// import useStore from '../../store/index.js';
// import axios from 'axios';
// import { ethers } from 'ethers';
// import Agora from '../../contracts/agora.json';
// import { agoraAddress } from '../../../config.js';

const FilmPage = () => {
  // const { filmId } = useParams();
  // const { genericProvider } = useStore((state) => state);
  // const [movie, setMovie] = useState(location.state);
  // const [filmStatus, setFilmStatus] = useState('active');

  // const nftBreakdown = [
  //   'Deleted scenes NFT',
  //   'Script NFT',
  //   'Name on Credits',
  //   'Buyout payback',
  //   'Revenue share',
  // ];

  // useEffect(() => {
  //   getMovieDetails(filmId);
  // }, []);

  // const getMovieDetails = async (id) => {
  //   const agoraContract = new ethers.Contract(agoraAddress, Agora.abi, genericProvider);

  //   const tokenUrl = await agoraContract.getOneMovie(id);
  //   const meta = await axios.get(tokenUrl);
  //   setMovie({
  //     tokenId: id.toNumber(),
  //     video: meta.data.video,
  //     image: meta.data.image,
  //     name: meta.data.name,
  //     description: meta.data.description,
  //     genre: meta.data.genre,
  //     language: meta.data.language,
  //     country: meta.data.country,
  //     duration: meta.data.duration,
  //     imageUrl: meta.data.imageUrl,
  //     videoUrl: meta.data.videoUrl,
  //     fundraisingAmount: meta.data.fundraisingAmount,
  //     numberOfTokens: meta.data.numberOfTokens,
  //     percentageGiven: meta.data.percentageGiven,
  //   });
  // };

  return (
    <div>
      {/* <h1>{movie.name}</h1>
      <Link to={`/watch/${movie.tokenId}`}>
        <button
          className="btn btn-primary btn-active rounded-none	"
          role="button"
          aria-pressed="true"
        >
          Watch
        </button>
        <p>{movie.description}</p>
      </Link>
      {filmStatus === 'active' && (
        <div>
          <h3>Token holder access</h3>
          {nftBreakdown.map((item, i) => {
            return <div key={i}>{item}</div>;
          })}
        </div>
      )} */}
    </div>
  );
};

export default FilmPage;
