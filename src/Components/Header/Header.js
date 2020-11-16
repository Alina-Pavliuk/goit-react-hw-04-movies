import styles from './Header.module.css';
import React from 'react';
import { NavLink } from 'react-router-dom'


const Header = () => {
  return (
    <div className={styles.nav}>
      <ul className={styles.navList}>
        <li className={styles.navList__item}>
          <NavLink to='/'
            exact
            className={styles.navList__item_link}
            activeClassName={styles.navList__item_active_link}>Home
        </NavLink>
        </li>
        <li className={styles.navList__item}>
          <NavLink to='/movies'
            className={styles.navList__item_link}
            activeClassName={styles.navList__item_active_link}>Movies
          </NavLink>
        </li>
      </ul>
    </div >
  );
};

export default Header;