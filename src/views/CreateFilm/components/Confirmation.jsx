import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Confirmation = ({ formData, tokenId }) => {
  const { videoUrl } = formData;

  return (
    <div className="w-11/12 max-w-lg mx-auto">
      <div className="py-12">
        <div className="mb-10">
          <h2 className="font-bold text-2xl mb-2">
            Congratulations! Your film is an NFT! 🎉
          </h2>
          <p className="text-gray-500">
            Now your content is ready to be shared with the community.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="mt-2">
            <p className="text-sm flex flex-col mt-1">
              <span className="font-bold">Token ID:</span>
              <span>{tokenId}</span>
            </p>
            <p className="text-sm flex flex-col mt-1">
              <span className="font-bold">Storage Address:</span>
              <a href={videoUrl} rel="noopener noreferrer" target="_blank">
                {videoUrl}
              </a>
            </p>
          </div>
          <video src={videoUrl} className="mt-6" width="100%" controls />

          <div className="width-full flex justify-center align-center mt-10">
            <Link
              to={`/film/${tokenId}`}
              className="bg-indigo-600 font-medium text-white text-sm px-6 py-3"
            >
              View film profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

Confirmation.propTypes = {
  formData: PropTypes.object.isRequired,
  tokenId: PropTypes.string.isRequired,
};

export default Confirmation;
