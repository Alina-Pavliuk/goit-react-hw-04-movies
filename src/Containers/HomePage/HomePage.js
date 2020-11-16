import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { withCredentials, request } from '../../helpers/request';
import styles from './HomePage.module.css';


class HomePage extends Component {
  state = {
    movies: [],
    loader: false,
    error: false
  }

  componentDidMount() {
    this.getMovie();
  }

  getMovie = async () => {
    const url = withCredentials('https://api.themoviedb.org/3/trending/movie/week?api_key=');
    try {
      this.loaderToggle(true);

      const movieResult = await request('get', url);
      this.setState({ movies: movieResult.results });
      this.loaderToggle(false);
    } catch (error) {
      this.errorToggle(true);
    }
  }

  loaderToggle = (status) => {
    this.setState({ loader: status });
  }

  errorToggle = (status) => {
    this.setState({ error: status });
  }

  render() {
    const { loader, error, movies } = this.state;

    if (error) {
      return <h1>Something went wrong. Please, try again or later</h1>
    }

    if (loader) {
      return (
        <Loader type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
        />
      )
    }

    return (
      <div>
        <h2>Trending today:</h2>
        <ul className={styles.trendingList}>
          {movies.map(movie => (
            <li key={movie.id}
              className={styles.trendingList_item}>
              <NavLink
                to={`/movies/${movie.id}`}
                className={styles.trendingList_item_link}
                activeClassName={styles.trendingList_item_link}
              >
                {movie.original_title}
              </NavLink>
            </li>))
          }
        </ul>
      </div>
    );
  }
}

export default HomePage;
