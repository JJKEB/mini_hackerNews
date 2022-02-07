import React from 'react';
import useGetData from '../../lib/useGetData';

const UserItem = ({ userName }) => {
  const [loading, resolved, error] = useGetData('user', userName);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  console.log(resolved);

  return (
    <div>
      <div>
        {resolved.id} : {resolved.karma}
      </div>
    </div>
  );
};

export default UserItem;
