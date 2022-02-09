import useGetData from '../../lib/useGetData';

const SubmitItem = ({ id, onAdd, done }) => {
  const [loading, resolved, error] = useGetData('item', id, onAdd, done);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  return null;
};

export default SubmitItem;
