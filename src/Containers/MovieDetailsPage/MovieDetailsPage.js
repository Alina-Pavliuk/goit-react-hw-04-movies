import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route } from 'react-router-dom';
import Loader from 'react-loader-spinner';

import { withCredentials, request } from '../../helpers/request'

const CardMovie = lazy(() => import('../../Components/CardMovie/CardMovie'));
const AdditionalInfo = lazy(() => import('../AdditionalInfo/AdditionalInfo'));
const Cast = lazy(() => import('../Cast/Cast'));
const Reviews = lazy(() => import('../Reviews/Reviews'));


class MovieDetailsPage extends Component {
  state = {
    movieDetails: {},
    loader: true,
    error: false,
    query: "",
    from: ""
  }

  componentDidMount() {
    this.setState({ query: this.props.location.query });
    this.setState({ from: this.props.location.from });
    this.getMovieDetails();
    console.log(this.props);
    console.log(this.state);
  }

  getMovieDetails = async () => {
    const { match, location } = this.props;
    const url = withCredentials(`https://api.themoviedb.org/3/movie/${match.params.movieId}?language=en-US&api_key=`);
    try {
      const movieDetails = await request('get', url);
      console.log(location.query);
      this.setState({ movieDetails });


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
    const { movieDetails, error, loader } = this.state;
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
      <div>
        <CardMovie state={this.state} />
        <hr />
        <AdditionalInfo movieDetails={movieDetails} />
        <hr />
        <Suspense fallback={<Loader type="Puff" color="#00BFFF" height={50} width={50} />}>
          <Switch>
            <Route path="/movies/:movieId/cast" component={Cast} />
            <Route path="/movies/:movieId/reviews" exact component={Reviews} />
          </Switch>
        </Suspense>
      </div>
    );
  }
}

export default MovieDetailsPage;