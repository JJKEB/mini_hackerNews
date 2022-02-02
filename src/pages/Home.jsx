// import HomeNewList from '../components/HomeNewList';
import Top from '../components/home/Top';
import New from '../components/home/New';
import Show from '../components/home/Show';
import Ask from '../components/home/Ask';
import Job from '../components/home/Job';
import style from '../scss/home.module.scss';

const Home = () => {
  return (
    <div className={style['home-container']}>
      <Top type={'topstories'} />
      <New type={'newstories'} />
      <Show type={'showstories'} />
      <Ask type={'askstories'} />
      <Job type={'jobstories'} />
    </div>
  );
};

export default Home;
