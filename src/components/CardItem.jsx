import React from 'react';
import useGetData from '../lib/useGetData';
import { txtSplit } from '../lib/utils';
import { NavLink } from 'react-router-dom';

const CardItem = ({ type, id, onAdd, index, pageing, loadCompletion }) => {
  const [loading, resolved, error] = useGetData(
    type,
    id,
    onAdd,
    loadCompletion,
  );
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  const { title, by, time, score, descendants, url } = resolved;

  // 페이징 지정한 갯수만 랜더링
  if (index <= pageing) {
    return (
      <div className="" style={{ borderBottom: '1px solid #333' }}>
        <div className="">
          <strong>{txtSplit(title, 'HN:')}</strong>
          <div>
            글쓴이 : <NavLink to={`/user/${by}`}>{by}</NavLink>
          </div>
          <div>{time}</div>
          <div>{score}</div>
          <div>{descendants}</div>
          <div>{url}</div>
        </div>
      </div>
    );
  }

  return null;
};

export default React.memo(CardItem);
