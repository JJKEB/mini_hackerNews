import React, { useState, useCallback } from 'react';
import _ from 'lodash';

const Align = ({ setData, setCurrentPageIng }) => {
  // 아이템 정렬 상태
  const [aligns, setAligns] = useState({
    mode: 'none',
    direction: false,
  });

  const listSort = useCallback(
    (sortWay = 'reverse') => {
      if (sortWay === 'reverse') {
        setData((data) => {
          const newData = _.cloneDeep(data);
          newData.showList.reverse();
          newData.tempList = []; // 정렬시 pageing 저장 리시트 초기화
          return newData;
        });
      }

      if (sortWay === 'time') {
        setData((data) => {
          const newData = _.cloneDeep(data);
          const newAlignItems = newData.showItems.sort((a, b) => {
            return Number(a.time) - Number(b.time);
          });
          const alignItemList = newAlignItems.map((item) => item.id);
          newData.showList = alignItemList;
          newData.tempList = []; // 정렬시 pageing 저장 리시트 초기화
          return newData;
        });
      }

      if (sortWay === 'results') {
        setData((data) => {
          const newData = _.cloneDeep(data);
          const newAlignItems = newData.showItems.sort((a, b) => {
            const itemA = itemCal(a);
            const itemB = itemCal(b);
            return itemA - itemB;
          });
          const alignItemList = newAlignItems.map((item) => item.id);
          newData.showList = alignItemList;
          newData.tempList = []; // 정렬시 pageing 저장 리시트 초기화
          function itemCal(item) {
            return item.kids
              ? item.descendants + item.score + item.kids.length
              : item.descendants + item.score;
          }
          return newData;
        });

        setCurrentPageIng(1); // 정렬시 page 1 로 전환
      }
    },
    [setData, setCurrentPageIng],
  );

  // 아이템 정렬 함수
  const dataAlign = useCallback(
    (e) => {
      const condition = e.target.value;
      if (aligns.mode === condition) {
        setAligns((align) => {
          const newAligns = _.cloneDeep(align);
          newAligns.direction = !newAligns.direction;
          return newAligns;
        });
        listSort('reverse');
      } else {
        setAligns((align) => {
          const newAligns = _.cloneDeep(align);
          newAligns.mode = condition;
          newAligns.direction = false;
          return newAligns;
        });
        listSort(condition);
      }
    },
    [aligns.mode, listSort],
  );

  return (
    <>
      <button onClick={(e) => dataAlign(e)} value="results">
        results{' : '}
        {aligns.mode === 'results' && aligns.direction ? 'up' : 'down'}
      </button>
      <button onClick={(e) => dataAlign(e)} value="time">
        time{' : '}
        {aligns.mode === 'time' && aligns.direction ? 'up' : 'down'}
      </button>
    </>
  );
};

export default React.memo(Align);
