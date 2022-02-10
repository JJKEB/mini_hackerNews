import React, { useState, useCallback } from 'react';
import ShowItem from './ShowItem';
import { Link } from 'react-router-dom';
import style from '../../scss/home.module.scss';
import useGetData from '../../lib/useGetData';
import { randomNum } from '../../lib/utils';
import { Swiper, SwiperSlide } from 'swiper/react';
import _ from 'lodash';
import icoReload from '../../assets/ico_reload.svg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/pagination';

const Show = ({ type, id }) => {
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

  const [loading, resolved, error] = useGetData(type, id, onAddList);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  return (
    <section className={`${style.section} ${style.full} ${style.show}`}>
      <div className={style.head}>
        <h2>
          <Link to="/show">Today's Show</Link>
        </h2>
        <button className={style.reload} onClick={() => onReload(data)}>
          <img src={icoReload} alt="" />
        </button>
      </div>
      <div className={style['show--contents']}>
        <Swiper
          slidesPerView={2}
          spaceBetween={16}
          freeMode={true}
          className="mySwiper"
        >
          {data.showList.map((id) => (
            <SwiperSlide key={id}>
              <ShowItem type={'item'} id={id} onAdd={onAddItems} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default React.memo(Show);
