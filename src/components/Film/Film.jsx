import React from 'react';

const Film = ({ imageUrl, name, country, duration, amountRaised }) => {
  return (
    <div className="film container">
      <div className="film__poster mb-2">
        <img src={imageUrl} alt="film poster" height="300" width="200" />
      </div>
      <div className="film__info flex items-center">
        <div className="film__title font-bold mr-1 text-lg">{name}</div>
        <div className="film__year text-sm">(2020)</div>
      </div>
      <div className="film_metadata flex mb-2">
        <div className="film__origin">
          <div className="film__country uppercase">{country}</div>
        </div>
        <div className="film_divider mx-2">•</div>
        <div className="film_runtime">
          <div className="film__runtime">{duration}m</div>
        </div>
      </div>
      <div className="film_funding">
        <div className="badge badge-primary">fundraising</div>
        <progress
          className="progress progress-primary"
          value={amountRaised}
          max="100"
        ></progress>
      </div>
    </div>
  );
};

export default Film;
