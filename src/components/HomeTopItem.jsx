import React from 'react';
import axios from 'axios';
import usePromise from '../lib/usePromise';

const HomeTopItem = ({ type, id, index }) => {
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

  // const searchId = response.slice(0, 15);
  // console.log(searchId);

  console.log('loading : ', loading);
  console.log('response : ', response);
  console.log('error : ', error);

  const { title, score, time, url } = response;

  return (
    <li>
      <div className="num">{index + 1}</div>
      <div className="content">
        <strong>{title}</strong>
      </div>
    </li>
  );
};

export default HomeTopItem;
