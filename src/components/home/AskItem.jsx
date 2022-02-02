import React from 'react';
import useGetData from '../../lib/useGetData';
import style from '../../scss/home.module.scss';

const AskItem = ({ type, id, onAdd }) => {
  const [loading, resolved, error] = useGetData(type, id, onAdd);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  const { title } = resolved;

  return (
    <div className={style['ask-item']}>
      <div className={style['ask-item--inner']}>
        <strong>{title}</strong>
      </div>
    </div>
  );
};

export default React.memo(AskItem);
