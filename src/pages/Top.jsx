import React, { useState, useCallback, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import CardList from '../components/CardList';
import Pageing from '../components/Pageing';
import Align from '../components/Align';
import UserRank from '../components/top/UserRank';
import _ from 'lodash';

const Top = () => {
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

  // tab 컴포넌트 리스트
  const tabs = {
    post: <CardList type="topstories" data={data} setData={setData} />,
    user: <UserRank userList={data.userList} />,
  };
  const [selectTab, setSelectTab] = useState('post');
  const changeTab = useCallback((nextTab) => {
    setSelectTab(nextTab);
  }, []);

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
    <div className="cards-wrap">
      <NavLink to="/top">Post</NavLink>
      <NavLink to={{ pathname: '/top/user', userList: { data } }}>User</NavLink>

      {data.limit}
      {data.loaded}

      {data.loadCompletion && (
        <div className="tabs">
          <button onClick={() => changeTab('post')}>Post</button>
          <button onClick={() => changeTab('user')}>user</button>
        </div>
      )}

      {data.loadCompletion && selectTab === 'post' ? (
        <>
          <Align setData={setData} setCurrentPageIng={setCurrentPageIng} />
        </>
      ) : null}

      {tabs[selectTab]}

      {data.loadCompletion && selectTab === 'post' ? (
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

export default React.memo(Top);
