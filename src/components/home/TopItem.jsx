import React from 'react';
import useGetData from '../../lib/useGetData';
import { lastTime } from '../../lib/utils';
import style from '../../scss/home.module.scss';

const TopItem = ({ type, id, index, onAdd }) => {
  const [loading, resolved, error] = useGetData(type, id, onAdd);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  const { title, by, score, time, url } = resolved;

  return (
    <>
      <div className={style['top-item']}>
        <div className={style['top--num']}>{index + 1}</div>
        <div className={style['top--content']}>
          <a href={url} target="_blank" rel="noopener noreferrer">
            <strong className="multi-line2">{title}</strong>
            <div className={style['top--details']}>
              <span>{by}</span>
              <span>{score} points</span>
              {time !== undefined && <span>{lastTime(time)}</span>}
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default React.memo(TopItem);
