import React from 'react';
import Lnb from './Lnb';
import style from '../scss/header.module.scss';
import { Link } from 'react-router-dom';

const Header = ({ onChangeTheme }) => {
  return (
    <header className={style.header}>
      <div className={style.bar}>
        <h1>
          <Link to="/">svelte Hacker news</Link>
        </h1>
        <div className={style.utils}>
          <button
            className={style.theme}
            onClick={onChangeTheme}
            aria-label="테마컬러변경"
          />
          <button className={style.qna} aria-label="Qna" />
        </div>
      </div>
      <Lnb />
    </header>
  );
};

export default Header;
