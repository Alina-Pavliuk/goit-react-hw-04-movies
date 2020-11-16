import React from 'react';
import styles from './Reviews.module.css'

export const ReviewsComponent = ({ movieReviews }) =>
  movieReviews.length ?
    <ul>
      {
        movieReviews.map(review => <li key={review.id} className={styles.reviewList__item}>
          <h4 className={styles.reviewAuthor}> Author: {review.author}</h4>
          <p className={styles.reviewContent}>{review.content}</p>
        </li>)
      }
    </ul>
    : <p className={styles.reviewContent}>We don't have any reviews for this movie</p>
