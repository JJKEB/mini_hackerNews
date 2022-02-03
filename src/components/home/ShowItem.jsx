import React from 'react';
import useGetData from '../../lib/useGetData';
import { lastTime, txtSplit, isDomain } from '../../lib/utils';
import style from '../../scss/home.module.scss';
import icoPoint from '../../assets/ico_point.svg';
import icoTime from '../../assets/ico_time.svg';
import icoBy from '../../assets/ico_profile.svg';
import icoComment from '../../assets/ico_comment.svg';

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
          {url && <span className={style['domain']}>{isDomain(url)}</span>}
          <strong className={style['show--title']}>
            {txtSplit(title, 'HN:')}
          </strong>
          <div className={style['show--bottom']}>
            <div className={style['show--details']}>
              <span className={style['show--point']}>
                <img src={icoPoint} alt="" />
                {score}
              </span>
              {time !== undefined && (
                <span className={style['show--time']}>
                  <img src={icoTime} alt="" />
                  {lastTime(time)}
                </span>
              )}
            </div>
            <div className={style['show--user']}>
              <span className={style['show--by']}>
                <img src={icoBy} alt="" />
                {by}
              </span>
              <span className={style['show--descendants']}>
                <img src={icoComment} alt="" />
                {descendants}
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default React.memo(ShowItem);
