import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGetData(type, id, onAdd) {
  const [loading, setLoading] = useState(false);
  const [resolved, setResolved] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = type === 'item' || type === 'user' ? `${type}/${id}` : type;
    const process = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `https://hacker-news.firebaseio.com/v0/${params}.json?print=pretty`,
        );
        setResolved(res.data);
        onAdd(res.data);
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    };
    process();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [loading, resolved, error];
}
