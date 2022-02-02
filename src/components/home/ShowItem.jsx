import React from 'react';
import useGetData from '../../lib/useGetData';
import { lastTime } from '../../lib/utils';
import style from '../../scss/home.module.scss';

const ShowItem = ({ type, id, onAdd }) => {
  const [loading, resolved, error] = useGetData(type, id, onAdd);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  const { title, by, score, time, url, descendants } = resolved;

  return (
    <div className={style['show-item']}>
      <div className={style['show-item--inner']}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url && <span className={style['domain']}>{url}</span>}
          <strong className={style['show--title']}>{title}</strong>
          <div className={style['show--bottom']}>
            <div className={style['show--details']}>
              <span className={style['show--point']}>{score}</span>
              {time !== undefined && (
                <span className={style['show--time']}>{lastTime(time)}</span>
              )}
            </div>
            <div className={style['show--user']}>
              <span className={style['show--by']}>{by}</span>
              <span className={style['show--descendants']}>{descendants}</span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default React.memo(ShowItem);
