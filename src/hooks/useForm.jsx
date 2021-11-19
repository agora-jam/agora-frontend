import { useState, useEffect } from 'react';

export default (initialData) => {
  const [formData, setFormData] = useState(initialData);
  const [isDisabled, setIsDisabled] = useState(true);

  const handleInputChange = (e) => {
    let { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    for (let key in formData) {
      if (!formData[key]) return setIsDisabled(true);
    }
    setIsDisabled(false);
  };

  useEffect(validateForm, [formData]);

  return {
    formData,
    setFormData,
    isDisabled,
    handleInputChange,
  };
};
