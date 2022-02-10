import React from 'react';
import useGetData from '../../lib/useGetData';

const ViewAsk = ({ id }) => {
  const [loading, resolved, error] = useGetData('item', id);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  console.log(resolved);

  return <div></div>;
};

export default ViewAsk;
