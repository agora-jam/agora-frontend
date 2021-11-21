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
    const image = e.target.files[0];
    if (image) {
      setImageFile(image);
      setError(null);
    }

    previewImage();
  };

  const previewImage = () => {
    const preview = document.querySelector('img');
    const file = document.querySelector('input[type=file]').files[0];
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      function () {
        // convert image file to base64 string
        preview.src = reader.result;
      },
      false,
    );

    if (file) {
      reader.readAsDataURL(file);
    }
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
      <div className="my-8 p-12 card bg-base-200">
        <h2 className="font-bold text-2xl	mb-10">Step 1: Film Information</h2>
        <div className="flex flex-col">
          <label className="font-bold mb-4">Film Title:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="input"
          />
          <label className="font-bold my-4 ">Description</label>
          <textarea
            type="text"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="textarea"
          />
          <label className="font-bold my-4">Genre</label>
          <input
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
            className="input"
          />
          <label className="font-bold my-4">Language</label>
          <input
            type="text"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            className="input"
          />
          <label className="font-bold my-4">Country</label>
          <input
            type="text"
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="input"
          />
          <label className="font-bold my-4">Duration (minutes)</label>
          <input
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleInputChange}
            className="input"
          />
          <label className="font-bold my-4">Thumbnail Image (2:3 ratio)</label>
          <div className="sm:border-t sm:border-gray-200">
            <div className="mt-1 sm:mt-0 sm:col-span-2">
              <div className="max-w-lg flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <img className="mt-2 mx-auto" width="350px" height="auto" />
                  {!imageFile && (
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                  <div className="text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="btn-sm btn-accent btn btn-outline"
                    >
                      {!imageFile ? (
                        <span>Upload thumbnail image</span>
                      ) : (
                        <span>Upload new thumbnail image</span>
                      )}
                      <input
                        id="file-upload"
                        type="file"
                        className="sr-only"
                        onChange={onImageChange}
                        name="thumbnail"
                      />
                    </label>
                  </div>
                  <p className="text-xs text-gray-500">PNG or JPG</p>
                </div>
              </div>
            </div>
          </div>
          {formData.imageUrl && (
            <img className="mt-2" width="350px" src={formData.imageUrl} />
          )}
        </div>
        <button
          onClick={handleSubmit}
          className="my-4 btn btn-block btn-primary"
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
