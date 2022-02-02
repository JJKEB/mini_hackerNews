// import HomeNewList from '../components/HomeNewList';
import React, { Suspense } from 'react';
import style from '../scss/home.module.scss';

// import Top from '../components/home/Top';
// import New from '../components/home/New';
// import Show from '../components/home/Show';
// import Ask from '../components/home/Ask';
// import Job from '../components/home/Job';

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
