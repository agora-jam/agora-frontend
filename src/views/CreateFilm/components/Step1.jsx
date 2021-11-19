import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { uploadMediaFile } from '../../../utils/storage';

const Step1 = ({
  formData,
  setFormData,
  currentStep,
  setCurrentStep,
  handleInputChange,
}) => {
  const [imageFile, setImageFile] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onImageChange = async (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    // Validate data
    const { name, description, genre, language, country, duration } = formData;
    if (!name || !description || !genre || !language || !country || !duration) {
      setError('Please fill all fields');
      return;
    }

    if (!imageFile && !formData.imageUrl) {
      setError('Please choose a file');
      return;
    }

    if (!imageFile && formData.imageUrl) {
      setCurrentStep(currentStep + 1);
      return;
    }

    setIsLoading(true);

    try {
      const tag = formData.name
        ? `thumb - ${formData.name.toLowerCase()}`
        : imageFile.name;

      const url = await uploadMediaFile(imageFile, tag);
      setFormData({ ...formData, imageUrl: url });

      setIsLoading(false);
      setCurrentStep(currentStep + 1);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="w-11/12 max-w-lg mx-auto">
      <div className="py-12">
        <h2 className="font-bold text-2xl	mb-10">Step 1: Film Information</h2>
        <div className="flex flex-col">
          <label className="font-bold">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="border-solid border-gray-200	border mb-4 px-4 py-2"
          />
          <label className="font-bold">Description</label>
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="border-solid border-gray-200	border mb-4 px-4 py-2"
          />
          <label className="font-bold">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="border-solid border-gray-200	border mb-4 px-4 py-2"
          />
          <label className="font-bold">Language</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            className="border-solid border-gray-200	border mb-4 px-4 py-2"
          />
          <label className="font-bold">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="border-solid border-gray-200	border mb-4 px-4 py-2"
          />
          <label className="font-bold">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="border-solid border-gray-200	border mb-4 px-4 py-2"
          />
          <label className="font-bold">Thumbnail Image (2:3 ratio)</label>
          <input className="mt-2" type="file" name="thumbnail" onChange={onImageChange} />
          {formData.imageUrl && (
            <img className="mt-2" width="350px" src={formData.imageUrl} />
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="bg-indigo-600 font-medium text-white text-sm px-6 py-3 mt-10"
          disabled={isLoading}
        >
          {isLoading ? 'Saving...' : 'Next'}
        </button>
        {error && <div className="text-red-500 mt-4">{error}</div>}
      </div>
    </div>
  );
};

Step1.propTypes = {
  currentStep: PropTypes.number.isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
};

export default Step1;
