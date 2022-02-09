import React, { useState, useEffect } from 'react';
import CardList from '../components/CardList';
import Pageing from '../components/Pageing';
import Align from '../components/Align';
import Progress from '../components/Progress';
import _ from 'lodash';
import style from '../scss/cards.module.scss';

const Show = () => {
  const [data, setData] = useState({
    limit: 100, // 랜더링할 갯수
    pageingNum: 20, // 페이징 최대 아이템 갯수
    loaded: 0, // 랜더링한 갯수
    loadCompletion: false, // api 아이템 로드 완료 확인용
    searchTime: 0, // api 조회한 시간
    dataAll: [], // 받은 데이터 전부
    showList: [], // 받은 데이터중 보여줄 데이터
    showItems: [], // 로드된 각 아이템 값들
    tempList: [], // pageing 용 임시 상태
    userList: [], // user ( by ) 리스트
  });

  // pageing 위치 확인 상태
  const [currentPageIng, setCurrentPageIng] = useState(1);

  // 정렬 스타일 상태
  const [alignStyle, setAlignStyle] = useState(style.rowAlign);

  // 로딩 완료시 user 리스트 추출
  useEffect(() => {
    if (data.loadCompletion) {
      setData((data) => {
        const newData = _.cloneDeep(data);
        newData.userList = data.showItems.map((item) => item.by);
        return newData;
      });
    }
  }, [data.loadCompletion]);

  return (
    <div className={`${style.cardsWrap} ${alignStyle}`}>
      <Progress
        active={true}
        progress={Math.floor((data.loaded / data.limit) * 100)}
      />

      {data.loadCompletion ? (
        <>
          <Align
            setData={setData}
            setCurrentPageIng={setCurrentPageIng}
            setAlignStyle={setAlignStyle}
          />
        </>
      ) : null}

      <CardList type="showstories" data={data} setData={setData} />

      {data.loadCompletion ? (
        <Pageing
          data={data}
          setData={setData}
          currentPageIng={currentPageIng}
          setCurrentPageIng={setCurrentPageIng}
        />
      ) : null}
    </div>
  );
};

export default React.memo(Show);
