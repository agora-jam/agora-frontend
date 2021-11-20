import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../router/routeList';

const Navbar = () => {
  return (
    <div className="border-b">
      <nav className="flex justify-between items-center w-11/12 mx-auto py-4">
        <Link to={routes.home} className="font-bold	text-lg">
          AGORA
        </Link>
        <Link
          to={routes.createFilm}
          className="btn btn-primary"
        >
          Upload film
        </Link>
      </nav>
    </div>
  );
};

export default Navbar;
