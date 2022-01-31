import axios from 'axios';
import usePromise from '../lib/usePromise';
import lastTime from '../lib/lastTime';

const HomeTopItem = ({ type, id, index }) => {
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

  const { title, by, score, time, url } = response;

  return (
    <li>
      <div className="num">{index + 1}</div>
      <div className="content">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <strong>{title}</strong>
          <p>
            {by} {score} points
          </p>
          {time !== undefined && <span>{lastTime(time)}</span>}
        </a>
      </div>
    </li>
  );
};

export default HomeTopItem;
