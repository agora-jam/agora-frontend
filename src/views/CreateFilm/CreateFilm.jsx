import React, { useState } from 'react';
import useForm from '../../hooks/useForm';

import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import Confirmation from './components/Confirmation';

const CreateFilm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [tokenId, setTokenId] = useState(null);
  const { formData, setFormData, handleInputChange } = useForm({
    // Film info
    name: '',
    description: '',
    genre: '',
    language: '',
    country: '',
    duration: '',
    // Media
    imageUrl: '',
    videoUrl: '',
    // Economic info
    fundraisingAmount: '',
    numberOfTokens: '',
    percentageGiven: '',
  });

  const steps = {
    1: Step1,
    2: Step2,
    3: Step3,
    4: Confirmation,
  };

  const Step = steps[currentStep];

  return (
    <div>
      <Step
        formData={formData}
        setFormData={setFormData}
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        handleInputChange={handleInputChange}
        setTokenId={setTokenId}
        tokenId={tokenId}
      />
    </div>
  );
};

export default CreateFilm;
