import React from 'react';
import { useHistory } from 'react-router-dom'

import styles from './CardMovie.module.css';

const CardMovie = ({ state }) => {
  const { title, vote_average, overview, genres, poster_path } = state.movieDetails;
  const history = useHistory();

  const goMovie = () => history.push({
    pathname: state.from,
    query: state.query,
    search: `search=${state.query} `
  })

  const goHome = () => history.push("/")
  return (
    <div className={styles.wrapperCardMovie}>
      <button
        type="button"
        className={styles.btnGoBack}
        onClick={() => state.from ? goMovie() : goHome()}
      >
        Go back
      </button>
      <div className={styles.posterMovie}>
        {poster_path && <img src={`https://image.tmdb.org/t/p/original/${poster_path}`}
          alt={`Photo:${state.movieDetails.title}`}
          width="250"
        />}
      </div>
      <div className={styles.infoMovie}>
        <h2 className={styles.titleMovie}>{title}</h2>
        <p className={styles.userScore}>User Score: {`${vote_average * 10}%`}</p>
        <h3 className={styles.titleDescription}>Overview</h3>
        <p className={styles.description}> {overview}</p>
        <h4 className={styles.genresTitle}>Genres:</h4>
        <p className={styles.genresContent}>
          {genres.map(({ id, name }) => (
            <span key={id} className={styles.genres}>
              {name}
            </span>)
          )}
        </p>
      </div>
    </div>
  );
};

export default CardMovie;