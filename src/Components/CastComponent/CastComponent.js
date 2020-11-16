import styles from './Cast.module.css';
import React from 'react';
import noAvatar from './no-avatar.png';

export const CastComponent = ({ movieCast }) =>
  <ul className={styles.castList}>
    {movieCast.map(actor => {
      const imgPath = actor.profile_path
        ? `https://image.tmdb.org/t/p/original/${actor.profile_path}`
        : noAvatar;

      return (
        <li key={actor.id} className={styles.castList__item}>
          <img src={imgPath} width="100" alt="actor" />
          <p className={styles.actorName}>{actor.name}</p>
          <p className={styles.actorCharacter}>
            <span className={styles.spanCharacter}>
              Character:
            </span>
            {actor.character}
          </p>
        </li>
      )
    })}
  </ul>
