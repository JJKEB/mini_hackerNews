import React, { useState, useCallback } from 'react';
import JobItem from './JobItem';
import { Link } from 'react-router-dom';
import style from '../../scss/home.module.scss';
import useGetData from '../../lib/useGetData';
import { randomNum } from '../../lib/utils';
import Slider from 'react-slick';
import _ from 'lodash';

const Job = ({ type, id }) => {
  const [data, setData] = useState({
    limit: 5, // 랜더링할 갯수
    loaded: 0, // 랜더링한 갯수
    searchTime: 0, // Api 조회한 시간
    dataAll: [], // 받은 데이터 전부
    showList: [], // 받은 데이터중 보여줄 데이터
    showItems: [], // 로드된 각 아이템 값들
    reRoadTime: 0, // reRoad 시간 초단위
  });

  const onAddList = useCallback((lists) => {
    setData((data) => {
      const newData = _.cloneDeep(data);
      newData.dataAll = lists;
      newData.searchTime = new Date().getHours();
      newData.showList = lists.slice(0, newData.limit);
      return newData;
    });
  }, []);

  const onAddItems = useCallback((item) => {
    setData((data) => {
      const newData = _.cloneDeep(data);
      newData.showItems = newData.showItems.concat(item);
      newData.loaded += 1;
      return newData;
    });
  }, []);

  // 중복 되지 않게 정해진 갯수만큼 id를 랜덤으로 뽑아 갱신
  const onReload = useCallback((data) => {
    const currentTime = new Date().getTime() / 1000;
    const flowTime = Math.floor(currentTime - data.reRoadTime);
    if (flowTime < 10) return alert('10초에 한번 갱신가능합니다.');

    setData((data) => {
      const nums = [];
      while (nums.length < data.limit) {
        const num = randomNum(0, data.dataAll.length - 1);
        if (nums.indexOf(data.dataAll[num]) < 0) {
          nums.push(data.dataAll[num]);
        }
      }
      const newData = _.cloneDeep(data);
      newData.showList = nums;
      newData.reRoadTime = currentTime;
      return newData;
    });
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [loading, resolved, error] = useGetData(type, id, onAddList);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  return (
    <section className={`${style.section} ${style.full} ${style.job}`}>
      <div className={style.head}>
        <h2>
          <Link to="/job">Today's Job</Link>
        </h2>
        <button className={style.reload} onClick={() => onReload(data)} />
      </div>
      <div className={style['job--contents']}>
        <Slider {...settings}>
          {data.showList.map((id) => (
            <JobItem key={id} type={'item'} id={id} onAdd={onAddItems} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default React.memo(Job);
