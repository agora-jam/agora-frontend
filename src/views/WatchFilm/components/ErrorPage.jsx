import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import routes from '../../../router/routeList';

const ErrorPage = ({ error }) => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p className="text-5xl font-bold">{error.title || 'Error'}</p>
      <p className="text-gray-500 mt-3">{error.message}</p>
      <Link to={routes.home} className="btn btn-primary mt-8">
        Go to home page
      </Link>
    </div>
  );
};

ErrorPage.propTypes = {
  error: PropTypes.object.isRequired,
};

export default ErrorPage;
