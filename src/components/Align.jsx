import React, { useState, useCallback } from 'react';
import _ from 'lodash';
import style from '../scss/cards.module.scss';

import icoCol from '../assets/icon_align_col.svg';
import icoRow from '../assets/icon_align_row.svg';
import icoArrow from '../assets/icon_arrow_down.svg';

const Align = ({ setData, setCurrentPageIng, setAlignStyle }) => {
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
    <div className={style.alignBar}>
      <div className={style.alignModes}>
        <button
          onClick={(e) => dataAlign(e)}
          value="results"
          className={`${
            aligns.mode === 'results' && aligns.direction
              ? style.up
              : style.down
          } ${aligns.mode === 'results' && style.active}`}
        >
          Results
          <span className="ico">
            <img src={icoArrow} alt="" />
          </span>
        </button>
        <button
          onClick={(e) => dataAlign(e)}
          value="time"
          className={`${
            aligns.mode === 'time' && aligns.direction ? style.up : style.down
          } ${aligns.mode === 'time' && style.active}`}
        >
          Time
          <span className="ico">
            <img src={icoArrow} alt="" />
          </span>
        </button>
      </div>

      {setAlignStyle && (
        <div className={style.alignStyles}>
          <button onClick={() => setAlignStyle(style.rowAlign)}>
            <img src={icoRow} alt="" />
          </button>
          <button onClick={() => setAlignStyle(style.colAlign)}>
            <img src={icoCol} alt="" />
          </button>
        </div>
      )}
    </div>
  );
};

export default React.memo(Align);
