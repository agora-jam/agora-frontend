import React, { Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';

import Navbar from '../components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import RedirectTo404 from './components/RedirectTo404';

// List of Routes
import routes from './routeList';

// Critical Components
import Home from '../views/Home';

// Non-Critical Components
const FilmPage = lazy(() => import('../views/FilmPage'));
const WatchFilm = lazy(() => import('../views/WatchFilm'));
const CreateFilm = lazy(() => import('../views/CreateFilm'));
const FilmList = lazy(() => import('../views/FilmList'));

const AppRouter = () => (
  <Suspense fallback={null}>
    <ScrollToTop>
      <Navbar />
      <Switch>
        <Route exact path={routes.home} component={Home} />
        <Route exact path={routes.filmPage} component={FilmPage} />
        <Route exact path={routes.watchFilm} component={WatchFilm} />
        <Route exact path={routes.createFilm} component={CreateFilm} />
        <Route exact path={routes.filmList} component={FilmList} />
        <RedirectTo404 />
      </Switch>
    </ScrollToTop>
  </Suspense>
);

export default AppRouter;
