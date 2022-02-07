import React from 'react';
import RankItem from './RankItem';

const User = ({ userList }) => {
  console.log(userList);

  return (
    <div>
      UserRanking
      {userList.map((user, i) => (
        <RankItem key={i} userName={user} />
      ))}
    </div>
  );
};

export default User;
