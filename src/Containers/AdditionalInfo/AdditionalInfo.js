import React from 'react';
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';

import styles from './AdditionalInfo.module.css'


const AdditionalInfo = ({ match }) =>
  <ul className={styles.AdditionalInfoList}>Additional information
    <li className={styles.AdditionalInfoList_item}>
      <NavLink
        to={`${match.url}/cast`}
        className={styles.AdditionalInfoList_item_link}
      >
        Cast
      </NavLink>
    </li>
    <li className={styles.AdditionalInfoList_item}>
      <NavLink
        to={`${match.url}/reviews`}
        className={styles.AdditionalInfoList_item_link}
      >
        Reviews
      </NavLink>
    </li>
  </ul>

export default withRouter(AdditionalInfo);