import React from 'react';
import useGetData from '../../lib/useGetData';

const UserSubmitted = ({ id, onAddList }) => {
  const [loading, resolved, error] = useGetData('item', id, onAddList);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  return <div>UserSubmitted</div>;
};

export default UserSubmitted;
