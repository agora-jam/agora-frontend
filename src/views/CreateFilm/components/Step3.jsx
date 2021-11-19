import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import { uploadMediaFile, saveMetadata } from '../../../utils/storage';

const Step3 = ({ formData, setFormData, currentStep, setCurrentStep, setTokenId }) => {
  const [videoFile, setVideoFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onVideoChange = async (e) => {
    setVideoFile(e.target.files[0]);
  };

  const onSubmit = async () => {
    // Validate Form
    if (!videoFile) return setError('Please select a video file');

    // Get Signer
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(); // eslint-disable-line no-unused-vars

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
      const tokenUri = await saveMetadata(finalFormData); // eslint-disable-line no-unused-vars

      // Create token // todo
      // const agoraContract = new Contract();
      // const transaction = await agoraContract.createToken(tokenUri);
      // const tx = await transaction.wait();
      // const event = tx.events[0];
      // const value = event.args[2];
      // const tokenId = value.toNumber();
      setTokenId('abc-123-test'); // todo: use real token id

      setIsLoading(false);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      setError(error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-11/12 max-w-lg mx-auto">
      <div className="py-12">
        <div className="mb-10">
          <h2 className="font-bold text-2xl mb-2">
            Step 3: Upload your film to the blockchain
          </h2>
          <p className="text-gray-500">
            Move your creation to the most reliable decentralized storage
          </p>
        </div>
        <div className="flex flex-col justify-center w-full	p-8 border border-dashed border-gray-200">
          <p className="text-sm	font-medium text-gray-400">MP4, WEBM or OGG. Max 32 GB.</p>
          <input type="file" name="video" onChange={onVideoChange} className="my-3" />
        </div>
        <div className="mt-10">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="border border-solid border-gray-200 font-medium text-sm px-6 py-3 mr-2"
          >
            Back
          </button>
          <button
            onClick={onSubmit}
            className="bg-indigo-600 font-medium text-white text-sm px-6 py-3"
            disabled={isLoading}
          >
            {isLoading ? 'Creating NFT...' : 'Create NFT'}
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
