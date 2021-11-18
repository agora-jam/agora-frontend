import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../router/routeList';

const Navbar = () => {
  return (
    <nav className="border-b py-5 px-8 flex justify-between	items-center">
      <Link to={routes.home} className="font-bold	text-lg">
        AGORA
      </Link>
      <Link
        to={routes.createFilm}
        className="bg-indigo-600 font-medium text-white text-sm px-4 py-3"
      >
        Upload film
      </Link>
    </nav>
  );
};

export default Navbar;
