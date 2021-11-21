import React from 'react';
// import axios from 'axios';
// import { ethers } from 'ethers';
// import Agora from '../../contracts/agora.json';
// import NFT from '../../contracts/nft.json';
// import { nftFilmAddress, agoraAddress } from '../../../config.js';

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
    <div>
      {/* {items.map((item, i) => {
        return (
          <div key={i}>
            <span>{item.name}</span>
            <span>{item.description}</span>
          </div>
        );
      })} */}
      Home
    </div>
  );
};

export default Home;
