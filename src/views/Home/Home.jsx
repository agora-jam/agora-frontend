import React from 'react';
// import axios from 'axios';
// import { ethers } from 'ethers';
// import Agora from '../../contracts/agora.json';
// import NFT from '../../contracts/nft.json';
// import { nftFilmAddress, agoraAddress } from '../../../config.js';
import { Link } from 'react-router-dom';
import routes from '../../router/routeList';

const Home = () => {
  // const { provider } = useStore((state) => state);
  // const [nfts, setNfts] = useState([]);
  // const [loadingState, setLoadingState] = useState('not-loaded');

  // useEffect(() => {
  //   loadNFTs();
  // }, []);

  // const loadNFTs = async () => {
  //   const tokenContract = new ethers.Contract(nftFilmAddress, NFT.abi, provider);
  //   const agoraContract = new ethers.Contract(agoraAddress, Agora.abi, provider);

  //   // const data = await agoraContract.getItems(); FIX_ME
  //   // const items = await Promise.all(
  //   //   data.map(async (i) => {
  //   //     const tokenUri = await tokenContract.tokenUri(i.tokenId);
  //   //     const meta = await axios.get(tokenUri);
  //   //     const seller, owner, price;
  //   //     const item = {
  //   //       tokenId: i.tokenId.toNumber(),
  //   //       name: meta.data.name,
  //   //       description: meta.data.description,
  //   //       video: meta.data.video,
  //   //     };
  //   //     return item;
  //   //   }),
  //   // );      FIX_ME;

  //   setNfts();
  //   setLoadingState('loaded');
  // };

  return (
    <div
      className="hero min-h-screen bg-base-200"
      style={{
        // eslint-disable-next-line no-undef
        backgroundImage: `url(${require('../../../assets/images/bg-home-low.jpg')})`,
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-2 text-6xl font-bold">AGORA</h1>
          <p className="mb-5 text-2xl">The first decentralized film festival.</p>
          <Link className="btn btn-primary mb-4 " to={routes.createFilm}>
            Create My NFT Film Submission
          </Link>
          <Link className="btn btn-accent" to={routes.createFilm}>
            View Films Submissions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
