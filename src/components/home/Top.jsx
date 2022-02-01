import React, { useState, useCallback } from 'react';
import TopItem from './TopItem';
import useGetData from '../../lib/useGetData';
import Slider from 'react-slick';
import _ from 'lodash';

const Top = ({ type, id }) => {
  const [data, setData] = useState({
    limit: 15, // 랜더링할 갯수
    loaded: 0, // 랜더링한 갯수
    searchTime: 0, // api 조회한 시간
    dataAll: [], // 받은 데이터 전부
    showList: [], // 받은 데이터중 보여줄 데이터
    showItems: [], // 로드된 각 아이템 값들
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

  const settings = {
    className: 'today-top-content',
    centerMode: true,
    infinite: false,
    centerPadding: '0',
    slidesToShow: 1,
    speed: 500,
    rows: 5,
    dots: true,
    slidesPerRow: 1,
    slidesToScroll: 1,
  };

  const cliee = () => {
    console.log(data);
  };

  const [loading, resolved, error] = useGetData(type, id, onAddList);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  return (
    <section className="today-top">
      <div className="sec-head">
        <h2>Today's top</h2>
        <span className="up-time">{data.searchTime}:00</span>
      </div>
      <button onClick={cliee}>test</button>
      <Slider {...settings}>
        {data.showList.map((id, i) => (
          <TopItem
            key={id}
            type={'item'}
            id={id}
            index={i}
            onAdd={onAddItems}
          />
        ))}
      </Slider>
    </section>
  );
};

export default React.memo(Top);
