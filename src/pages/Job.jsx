import React, { useState } from 'react';
import CardList from '../components/CardList';
import Pageing from '../components/Pageing';
import Align from '../components/Align';

const Job = () => {
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
  });

  // pageing 위치 확인 상태
  const [currentPageIng, setCurrentPageIng] = useState(1);

  return (
    <div className="cards-wrap">
      {data.limit}
      {data.loaded}

      {data.loadCompletion && (
        <Align setData={setData} setCurrentPageIng={setCurrentPageIng} />
      )}

      <CardList type="jobstories" data={data} setData={setData} />

      {data.loadCompletion && (
        <Pageing
          data={data}
          setData={setData}
          currentPageIng={currentPageIng}
          setCurrentPageIng={setCurrentPageIng}
        />
      )}
    </div>
  );
};

export default React.memo(Job);
