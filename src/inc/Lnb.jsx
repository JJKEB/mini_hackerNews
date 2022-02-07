import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../scss/header.module.scss';

const Lnb = () => {
  return (
    <nav className={style.lnb}>
      <ul>
        <li>
          <NavLink to="/">
            <span>Home</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/top">
            <span>Top</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/new">
            <span>New</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/show">
            <span>Show</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/ask">
            <span>Ask</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/job">
            <span>Job</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Lnb;
