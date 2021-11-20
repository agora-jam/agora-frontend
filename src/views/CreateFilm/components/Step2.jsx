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
    if (!numberOfTokens || !fundraisingAmount) return '';

    const percentage = 100 / parseInt(numberOfTokens);

    return percentage.toFixed(4).toString() + '%';
  };

  return (
    <div className="w-11/12 max-w-lg mx-auto">
      <div className="my-8 p-12 card bg-base-200">
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
              className="input w-full"
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
              className="input w-full"
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
              className="input w-full"
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
            {percentageGiven && numberOfTokens && (
              <div className="flex justify-between items-baseline my-4">
                <div className="card text-center bg-white shadow-xl rounded-r-none">
                  <div className="card-body">
                    <i className="m-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                        />
                      </svg>
                    </i>
                    <h2 className="card-title mt-4">
                      You will own {100 - percentageGiven}% of tokens
                    </h2>
                    <p>
                      This is equal to {numberOfTokens * ((100 - percentageGiven) / 100)}{' '}
                      of the total tokens created.
                    </p>
                    {/* <div className="justify-center card-actions">
                      <button className="btn btn-link">More info</button>
                    </div> */}
                  </div>
                </div>
                <div className="card text-center bg-primary text-white shadow-xl rounded-l-none">
                  <div className="card-body">
                    <i className="m-auto">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                        />
                      </svg>
                    </i>
                    <h2 className="card-title mt-4">
                      {percentageGiven}% available for fundraising
                    </h2>
                    <p>
                      This is equal to {numberOfTokens * (percentageGiven / 100)} of the
                      total tokens created.
                    </p>
                    {/* <div className="justify-center card-actions">
                      <button className="btn btn-ghost">More info</button>
                    </div> */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="mt-12">
          <button
            onClick={() => setCurrentStep(currentStep - 1)}
            className="btn btn-secondary btn-outline"
          >
            Back
          </button>
          <button onClick={handleSubmit} className="ml-4 btn btn-primary">
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
