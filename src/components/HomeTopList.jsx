import axios from 'axios';
import usePromise from '../lib/usePromise';
import HomeTopItem from './HomeTopItem';

const HomeTopList = ({ type, id }) => {
  const params = type === 'item' || type === 'user' ? `${type}/${id}` : type;

  const [loading, response, error] = usePromise(() => {
    return axios.get(`https://hacker-news.firebaseio.com/v0/${params}.json`);
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

  return (
    <ul>
      {searchId.map((id, i) => (
        <HomeTopItem key={id} type={'item'} id={id} index={i} />
      ))}
    </ul>
  );
};

export default HomeTopList;
