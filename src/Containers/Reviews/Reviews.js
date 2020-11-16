import React, { Component } from 'react';
import Loader from 'react-loader-spinner';

import { ReviewsComponent } from '../../Components/Reviews/ReviewsComponent';
import { withCredentials, request } from '../../helpers/request';


class Reviews extends Component {
  state = {
    movieReviews: [],
    loader: false,
    error: false
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews = async () => {
    const { match } = this.props;
    const url = withCredentials(`https://api.themoviedb.org/3/movie/${match.params.movieId}/reviews?language=en-US&page=1&api_key=`);
    try {
      this.loaderToggle(true);

      const movieReviews = await request('get', url);
      this.setState({ movieReviews: movieReviews.results });
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
    const { movieReviews, error, loader } = this.state;
    if (error) {
      return <h1>Something went wrong. Please, try again or later</h1>
    }

    if (loader) {
      return <Loader
        type="Puff"
        color="#00BFFF"
        height={30}
        width={30}
      />
    }

    return <ReviewsComponent movieReviews={movieReviews} />
  }
}

export default Reviews;