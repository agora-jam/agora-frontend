import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import { uploadMediaFile, saveMetadata } from '../../../utils/storage';

import { agoraAddress, agoraShareAddress } from '../../../../config';
import useStore from '../../../store';

import Agora from '../../../contracts/agora.json';
import AgoraShare from '../../../contracts/agoraShare.json';

const Step3 = ({ formData, setFormData, currentStep, setCurrentStep, setTokenId }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { signer, account } = useStore((state) => state);

  const onVideoChange = async (e) => {
    setVideoFile(e.target.files[0]);
  };

  const onSubmit = async () => {
    // Validate Form
    if (!videoFile) return setError('Please select a video file');

    if (!account) return setError('Please connect your wallet');

    setIsLoading(true);

    try {
      // Upload video
      const tag = formData.name
        ? `video - ${formData.name.toLowerCase()}`
        : videoFile.name;

      const url = await uploadMediaFile(videoFile, tag);

      // Set State
      const finalFormData = { ...formData, videoUrl: url };
      setFormData(finalFormData);

      // Save metadata
      const metadataUrl = await saveMetadata(finalFormData);

      // Call contract to create movie NFT
      const agoraContract = new ethers.Contract(agoraAddress, Agora.abi, signer);
      const transaction = await agoraContract.create(metadataUrl);
      const tx = await transaction.wait();

      // Get movie nft token id
      const event = tx.events[0];
      const value = event.args[2];
      const tokenId = value.toNumber();

      setTokenId(tokenId);

      // --- Share Tokens ---

      // Format input data
      const fundraisingAmount = ethers.utils.parseEther(formData.fundraisingAmount);
      const numberOfTokens = parseInt(formData.numberOfTokens);
      const percentageGiven = parseInt(formData.percentageGiven); // needs to be an integer

      // Call contract to create share token
      const agoraShareContract = new ethers.Contract(
        agoraShareAddress,
        AgoraShare.abi,
        signer,
      );

      const shareTransaction = await agoraShareContract.shareAgoraNft(
        tokenId,
        numberOfTokens,
        percentageGiven,
        fundraisingAmount,
      );

      await shareTransaction.wait();

      setIsLoading(false);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-11/12 max-w-lg mx-auto">
      <div className="my-8 p-12 card bg-base-200">
        <div className="mb-5">
          <h2 className="font-bold text-2xl mb-2">
            Step 3: Upload your film to the blockchain
          </h2>
          <p className="text-gray-500">
            Move your creation to the most reliable decentralized storage
          </p>
          <div className="powered-by flex mt-5 items-center text-gray-500">
            <p>Powered by </p>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/c/c2/IPFS_logo.png"
              alt="IPFS logo"
              width="75px"
              height="auto"
            />
          </div>
        </div>
        <div className="sm:border-t sm:border-gray-200">
          <div className="mt-1 sm:mt-0 sm:col-span-2">
            <div className="max-w-lg px-6 p-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="flex items-center">
                <label
                  htmlFor="film-upload"
                  className="btn-sm btn-accent btn btn-outline mr-2"
                >
                  Upload Video
                  <input
                    id="film-upload"
                    type="file"
                    name="video"
                    onChange={onVideoChange}
                    className="sr-only"
                  />
                </label>
                <p className="text-sm	font-medium text-gray-400">
                  MP4, WEBM or OGG. Max 32 GB.
                </p>
              </div>
              {videoFile && <p className="mt-2">{videoFile.name}</p>}
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            onClick={onSubmit}
            className={'btn btn-primary btn-block mb-4' + (isLoading ? ' loading' : '')}
            disabled={isLoading}
          >
            {isLoading ? 'Creating Film NFT' : 'Upload and Create Film NFT'}
          </button>
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="btn btn-secondary btn-outline btn-block"
          >
            Back
          </button>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

Step3.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  setTokenId: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
};

export default Step3;
