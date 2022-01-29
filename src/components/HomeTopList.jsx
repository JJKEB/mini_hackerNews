import React from 'react';
import axios from 'axios';
import usePromise from '../lib/usePromise';
import HomeTopItem from './HomeTopItem';

const HomeTopList = ({ type, id }) => {
  const [loading, response, error] = usePromise(() => {
    const params = type === 'item' || type === 'user' ? `${type}/${id}` : type;
    return axios.get(
      `https://hacker-news.firebaseio.com/v0/${params}.json?print=pretty`,
    );
  }, [id]);

  // 대기중
  if (loading) {
    return null;
  }
  // 결과가 없을때
  if (!response) {
    return null;
  }
  // 에러발생
  if (error) {
    return console.log('에러발생');
  }

  const searchId = response.slice(0, 15);
  console.log(searchId);

  console.log('loading : ', loading);
  console.log('response : ', response);
  console.log('error : ', error);

  return (
    <ul>
      {searchId.map((id, i) => (
        <HomeTopItem key={id} type={'item'} id={id} index={i} />
      ))}
    </ul>
  );
};

export default HomeTopList;
