import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../../router/routeList';

const NotFound = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <p className="text-5xl font-bold">Film not found</p>
      <Link to={routes.home} className="btn btn-primary mt-8">
        Go to home page
      </Link>
    </div>
  );
};

export default NotFound;
