import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import { withCredentials, request } from '../../helpers/request';
import { CastComponent } from '../../Components/CastComponent/CastComponent';


class Cast extends Component {
  state = {
    movieCast: [],
    loader: false,
    error: false
  }

  componentDidMount() {
    this.getCast();
  }

  getCast = async () => {
    const { match } = this.props
    const url = withCredentials(`https://api.themoviedb.org/3/movie/${match.params.movieId}/credits?language=en-US&api_key=`)
    try {
      this.loaderToggle(true);
      const movieCast = await request('get', url);
      this.setState({ movieCast: movieCast.cast });
      this.loaderToggle(false);
    } catch (error) {
      this.errorToggle(true)
    }
  }

  loaderToggle = (status) => {
    this.setState({ loader: status })
  }

  errorToggle = (status) => {
    this.setState({ error: status })
  }

  render() {
    const { movieCast, error, loader } = this.state

    if (loader) {
      return <Loader type="Puff"
        color="#00BFFF"
        height={30}
        width={30}
      />
    }

    if (error) {
      return <h1>Something went wrong. Please, try again or later</h1>
    }

    return (
      <CastComponent movieCast={movieCast} />
    );
  }
}

export default Cast;