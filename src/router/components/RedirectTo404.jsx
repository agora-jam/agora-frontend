import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const RedirectTo404 = ({ location }) => {
  return <Redirect to={Object.assign({}, location, { state: { is404: true } })} />;
};

RedirectTo404.propTypes = {
  location: PropTypes.object,
};

export default RedirectTo404;
