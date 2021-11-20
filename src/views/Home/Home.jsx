import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../router/routeList';

const Home = () => {
  return (
    <div
      className="hero min-h-screen bg-base-200"
      style={{
        // eslint-disable-next-line no-undef
        backgroundImage: `url(${require('../../../assets/images/bg-home-low.jpg')})`,
      }}
    >
      <div className="hero-overlay bg-opacity-80"></div>
      <div className="text-center hero-content text-neutral-content">
        <div className="max-w-md">
          <h1 className="mb-2 text-6xl font-bold">AGORA</h1>
          <p className="mb-5 text-2xl">The first decentralized film festival.</p>
          <Link className="btn btn-primary mb-4 " to={routes.createFilm}>
            Create My NFT Film Submission
          </Link>
          <Link className="btn btn-accent" to={routes.createFilm}>
            View Films Submissions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
