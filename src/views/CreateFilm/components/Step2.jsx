import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Step2 = ({ formData, currentStep, setCurrentStep, handleInputChange }) => {
  const [error, setError] = useState(null);

  const { fundraisingAmount, numberOfTokens, percentageGiven } = formData;

  const handleSubmit = () => {
    if (!fundraisingAmount || !numberOfTokens || !percentageGiven) {
      setError('Please fill all fields');
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const getTokenPrice = () => {
    if (!fundraisingAmount || !numberOfTokens) return '';

    const price = parseInt(fundraisingAmount) / parseInt(numberOfTokens);
    return price.toString() + ' ETH';
  };

  const getTokenPercentage = () => {
    if (!percentageGiven || !numberOfTokens || !fundraisingAmount) return '';

    const tokenPrice = parseInt(fundraisingAmount) / parseInt(numberOfTokens);

    const percentage =
      (parseInt(tokenPrice) / parseInt(fundraisingAmount)) *
      (parseInt(percentageGiven) / 100);

    return (percentage * 100).toFixed(2).toString() + '%';
  };

  return (
    <div className="w-11/12 max-w-lg mx-auto">
      <div className="py-12">
        <div className="mb-10">
          <h2 className="font-bold text-2xl mb-2">Step 2: Fractionalize your NFT</h2>
          <p className="text-gray-500">
            {`Easily raise funds by creating and selling share tokens. You won't lose
            control of the film license or property rights.`}
          </p>
        </div>
        <div className="flex flex-col">
          <label className="font-bold mb-2">{`How much do you want to raise?`}</label>
          <div className="relative mb-6">
            <input
              type="text"
              name="fundraisingAmount"
              value={fundraisingAmount}
              onChange={handleInputChange}
              className="border-solid border-gray-200	border px-4 py-2 w-full"
            />
            <div className="absolute top-0 right-5 h-full flex items-center">
              <span className="text-gray-500 text-sm">ETH</span>
            </div>
          </div>

          <label className="font-bold">{`How many tokens do you want to create?`}</label>
          <label className="text-sm	text-gray-500 mb-2">
            This will determine the price of an individual token. Must be a whole number.
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              name="numberOfTokens"
              value={numberOfTokens}
              onChange={handleInputChange}
              className="border-solid border-gray-200	border px-4 py-2 w-full"
            />
            <div className="absolute top-0 right-5 h-full flex items-center">
              <span className="text-gray-500 text-sm">tokens</span>
            </div>
          </div>

          <label className="font-bold">{`What % of ownership will you give away?`}</label>
          <label className="text-sm	text-gray-500 mb-2">
            This percentage of ownership will be distributed among token holders.
          </label>
          <div className="relative mb-6">
            <input
              type="text"
              name="percentageGiven"
              value={percentageGiven}
              onChange={handleInputChange}
              className="border-solid border-gray-200	border px-4 py-2 w-full"
            />
            <div className="absolute top-0 right-5 h-full flex items-center">
              <span className="text-gray-500 text-sm">%</span>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h4 className="mb-3 font-bold text-lg">Share Tokens Summary</h4>
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <span>Total number of tokens</span>
              <span className="flex-grow border-b border-dashed border-gray-200 mx-4"></span>
              <span>{numberOfTokens ? numberOfTokens + ' tokens' : ''}</span>
            </div>
            <div className="flex justify-between items-baseline mb-2">
              <span>Token price</span>
              <span className="flex-grow border-b border-dashed border-gray-200 mx-4"></span>
              <span>{getTokenPrice()}</span>
            </div>
            <div className="flex justify-between items-baseline mb-2">
              <span>Ownership per token</span>
              <span className="flex-grow border-b border-dashed border-gray-200 mx-4"></span>
              <span>{getTokenPercentage()}</span>
            </div>
          </div>
        </div>
        <div className="mt-12">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="border border-solid border-gray-200 font-medium text-sm px-6 py-3 mr-2"
          >
            Back
          </button>
          <button
            onClick={handleSubmit}
            className="bg-indigo-600 font-medium text-white text-sm px-6 py-3"
          >
            Next
          </button>
        </div>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

Step2.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
};

export default Step2;
