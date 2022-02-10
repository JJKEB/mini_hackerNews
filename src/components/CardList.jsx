import React, { useCallback } from 'react';
import useGetData from '../lib/useGetData';
import CardItem from './CardItem';
import _ from 'lodash';
import style from '../scss/cards.module.scss';

const CardList = ({ type, id, data, setData }) => {
  // Api 호출시 List 저장용
  const onAddList = useCallback(
    (lists) => {
      setData((data) => {
        const newData = _.cloneDeep(data);
        newData.dataAll = lists;
        newData.searchTime = new Date().getHours();
        // Api ID list 반환결과가 limit 갯수 이상일시 limit 갯수까지만 아이템 호출
        if (newData.dataAll.length < newData.limit)
          newData.limit = newData.dataAll.length;
        newData.showList = lists.slice(0, newData.limit);
        return newData;
      });
    },
    [setData],
  );

  // Api 호출시 List item 저장용
  const onAddItems = useCallback(
    (item) => {
      setData((data) => {
        const newData = _.cloneDeep(data);
        newData.showItems = newData.showItems.concat(item);
        newData.loaded += 1;
        // 정해진 갯수만큼 아이템 로드가 완료됬을시
        if (newData.limit === newData.loaded) {
          newData.loadCompletion = true;
        }
        return newData;
      });
    },
    [setData],
  );

  const [loading, resolved, error] = useGetData(type, id, onAddList);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  return (
    <div className={style.cardList}>
      {data.showList.map((id, i) => (
        <CardItem
          key={id}
          type={'item'}
          id={id}
          index={i}
          onAdd={onAddItems}
          pageing={data.pageingNum}
          loadCompletion={data.loadCompletion}
        />
      ))}
    </div>
  );
};

export default React.memo(CardList);
