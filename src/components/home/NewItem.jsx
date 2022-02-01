import React from 'react';
import useGetData from '../../lib/useGetData';
import { lastTime } from '../../lib/utils';

const NewItem = ({ type, id, index, onAdd }) => {
  const [loading, resolved, error] = useGetData(type, id, onAdd);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  const { title, by, score, time, url } = resolved;

  return (
    <div className="item-inner">
      <div className="num">{index + 1}</div>
      <div className="content">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <strong>{title}</strong>
          <p>
            {by} {score} points
          </p>
          {time !== undefined && <span>{lastTime(time)}</span>}
        </a>
      </div>
    </div>
  );
};

export default React.memo(NewItem);
