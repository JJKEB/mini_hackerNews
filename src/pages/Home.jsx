// import HomeNewList from '../components/HomeNewList';
import Top from '../components/home/Top';
import New from '../components/home/New';
import Show from '../components/home/Show';

const Home = () => {
  return (
    <div className="home-content">
      <Top type={'topstories'} />
      <New type={'newstories'} />
      <Show type={'showstories'} />
    </div>
  );
};

export default Home;
