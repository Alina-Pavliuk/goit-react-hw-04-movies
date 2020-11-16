import React, { Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import Header from './Header/Header';
import './App.css';


const HomePage = lazy(() => import('../Containers/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../Containers/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../Containers/MovieDetailsPage/MovieDetailsPage'));


const App = () =>
  <div>
    <Suspense fallback={<Loader type="Puff" color="#00BFFF" height={100} width={100} />}>
      <Header />

      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/movies/:movieId" component={MovieDetailsPage} />
        <Route path="/movies" component={MoviesPage} />

        <Redirect to="/" />
      </Switch>
    </Suspense>
  </div>

export default App;
