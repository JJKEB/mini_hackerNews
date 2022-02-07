import React from 'react';
import { useLocation } from 'react-router-dom';
import useGetData from '../lib/useGetData';
import UserSubmitted from '../components/user/UserSubmitted';

const User = (props) => {
  // console.log(props);
  const location = useLocation();

  const [loading, resolved, error] = useGetData('user', 'midzer');
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  console.log(resolved);

  return (
    <div>
      <section className="user-info">
        <h2 className="user-id">{resolved.id}</h2>
        <div className="user-info">
          <div className="">
            {resolved.created} {resolved.karma}
          </div>
          <div className="about">{resolved.about}</div>
        </div>
      </section>
    </div>
  );
};

export default User;
