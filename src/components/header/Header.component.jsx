// Package dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import classes from './Header.module.scss';

const Header = () => (
  <div className={classes.header}>
    <Link to="/" className={classes.header_logo}>
      Home
    </Link>
    <div className={classes.header_options}>
      <ul className={classes.header_buttons}>
        <li>
          <Link to="/stats" className={classes.header_button}>
            Stats
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Header;
