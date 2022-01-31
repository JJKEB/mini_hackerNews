import React from 'react';
import HomeNewList from '../components/HomeNewList';
import HomeTopList from '../components/HomeTopList';

const Home = () => {
  return (
    <>
      <HomeTopList type={'topstories'} />
      <HomeNewList type={'newstories'} />
    </>
  );
};

export default Home;
