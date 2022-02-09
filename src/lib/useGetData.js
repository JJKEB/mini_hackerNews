import { useState, useEffect } from 'react';
import axios from 'axios';

/**
 * @param {*} type 호출 하고자 하는 타입 user, item, 등등 - [필수]
 * @param {*} id 호출할 아이템의 아이디
 * @param {*} onAdd 호출과 동시에 스테이스에 올릴 훅
 * @param {*} loadCompletion 훅 재실행 방지용 state 값
 * @returns
 */
export default function useGetData(type, id, onAdd, loadCompletion) {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // 페이지 전환시 요청 취소
    const request = axios.CancelToken.source();
    const params = type === 'item' || type === 'user' ? `${type}/${id}` : type;
    const process = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://hacker-news.firebaseio.com/v0/${params}.json`,
          {
            cancelToken: request.token,
          },
        );

        if (onAdd && !loadCompletion) onAdd(res.data);
        setResolved(res.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    return () => {
      setLoading(false);
      request.cancel('Axios request canceled.');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [loading, resolved, error];
}
