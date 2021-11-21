import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../router/routeList';

const NotAuthorized = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p className="text-5xl font-bold">You are not authorized</p>
      <p className="text-gray-500 mt-3">
        You must purchase a film token to watch this content
      </p>
      <Link to={routes.home} className="btn btn-primary mt-8">
        Go to home page
      </Link>
    </div>
  );
};

export default NotAuthorized;
