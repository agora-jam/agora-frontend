import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../router/routeList';

const NotFound = () => {
  return (
    <div>
      <div>
        <div>
          <p>404</p>
          <p>{`We can't find this page`}</p>
        </div>
        <Link to={routes.home}>Take me home</Link>
      </div>
    </div>
  );
};

export default NotFound;
