import React, { Suspense } from 'react';
import style from '../scss/home.module.scss';
const Top = React.lazy(() => import('../components/home/Top'));
const New = React.lazy(() => import('../components/home/New'));
const Show = React.lazy(() => import('../components/home/Show'));
const Ask = React.lazy(() => import('../components/home/Ask'));
const Job = React.lazy(() => import('../components/home/Job'));

const Home = () => {
  return (
    <div className={style['home-container']}>
      <Suspense fallback={<div>Loading...</div>}>
        <Top type={'topstories'} />
        <New type={'newstories'} />
        <Show type={'showstories'} />
        <Ask type={'askstories'} />
        <Job type={'jobstories'} />
      </Suspense>
    </div>
  );
};

export default Home;
