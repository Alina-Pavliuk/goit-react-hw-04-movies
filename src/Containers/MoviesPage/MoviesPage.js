import React, { Component } from 'react';
import styles from './MoviesPage.module.css'
import { NavLink } from 'react-router-dom';
import { withCredentials, request } from '../../helpers/request'
import Loader from 'react-loader-spinner';

class MoviesPage extends Component {
  state = {
    search: '',
    resultSearch: [],
    loader: false,
    error: false
  }

  componentDidMount() {
    const searchParam = this.getSearchParamFromUrl();

    if (Boolean(searchParam)) {
      this.searchMovies(searchParam);
    }
  }

  inputHandler = ({ target }) => {
    const { value } = target;
    this.setState({ search: value });
  }

  submitHandler = async (e) => {
    e.preventDefault();
    this.appendSearchToUrl();
    this.searchMovies(this.state.search);
    this.cleanSearchInput();
  }

  searchMovies = async (term) => {
    this.loaderToggle(true);
    const url = withCredentials(`https://api.themoviedb.org/3/search/movie?language=en-US&query=${term}&page=1&include_adult=false&api_key=`);
    try {

      const result = await request('get', url);
      this.setState({ resultSearch: result.results })
    } catch (error) {
      this.errorToggle(true)
    }
    finally {
      this.loaderToggle(false)
    }

  }

  appendSearchToUrl = () => {
    this.props.history.push(`?search=${this.state.search}`);
  }

  cleanSearchInput = () => {
    this.setState({ search: '' });
  }

  getSearchParamFromUrl = () => {
    return new URLSearchParams(window.location.search).get('search');
  }

  loaderToggle = (status) => {
    this.setState({ loader: status })
  }

  errorToggle = (status) => {
    this.setState({ error: status })
  }

  render() {
    const { search, resultSearch, error, loader } = this.state;

    return (
      <div>
        <form onSubmit={this.submitHandler}>
          <input name="search" type="text" value={search} onChange={this.inputHandler}></input>
          <button type="submit">Search</button>
        </form>
        {loader && <Loader type="Puff"
          color="#00BFFF"
          height={30}
          width={30}
        />}

        {!loader && !error && <>
          <ul className={styles.searchList}>
            {resultSearch.map(movie => (<li key={movie.id}>
              <NavLink to={`/movies/${movie.id}`}>
                {movie.original_title}
              </NavLink>
            </li>
            ))}

          </ul>
        </>}
        {error && <h1>Something went wrong. Please, try again or later</h1>}
      </div>
    );
  }
}

export default MoviesPage;