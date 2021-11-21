import React from 'react';

const Film = ({ imageUrl, name, country, duration }) => {
  return (
    <div className="film container">
      <div className="film__poster">
        <img src={imageUrl} alt="film poster" height="300" width="200" />
      </div>
      <div className="film__info flex items-center">
        <div className="film__title font-bold mr-1">{name}</div>
        <div className="film__year text-sm">(2020)</div>
      </div>
      <div className="film_metadata flex">
        <div className="film__origin">
          <div className="film__country uppercase">{country}</div>
        </div>
        <div className="film_divider mx-2">•</div>
        <div className="film_runtime">
          <div className="film__runtime">{duration}m</div>
        </div>
      </div>
      <div className="film_funding">
        <progress className="progress progress-primary" value="40" max="100"></progress>
      </div>
    </div>
  );
};

export default Film;
