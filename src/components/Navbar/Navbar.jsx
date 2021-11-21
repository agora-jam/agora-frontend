import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../router/routeList';
import useStore from '../../store';
import useWallet from '../../hooks/useWallet';

const Navbar = () => {
  const { account } = useStore((state) => state);
  const { connectWallet } = useWallet();

  return (
    <div className="border-b">
      <nav className="flex justify-between items-center w-11/12 mx-auto py-4">
        <Link to={routes.home} className="font-bold	text-lg">
          AGORA
        </Link>
        <div className="flex">
          {account ? null : (
            <button
              onClick={() => connectWallet()}
              className="border border-solid border-gray-200 font-medium text-sm px-4 py-3 mr-2"
            >
              Connect wallet
            </button>
          )}
          {/* <Link
            to={routes.createFilm}
            className="bg-indigo-600 font-medium text-white text-sm px-4 py-3"
          >
            Upload film
          </Link> */}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
