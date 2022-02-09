import React, { useState, useEffect, useCallback } from 'react';
import CardList from '../components/CardList';
import Pageing from '../components/Pageing';
import Align from '../components/Align';
import UserRank from '../components/top/UserRank';
import Progress from '../components/Progress';
import TabBar from '../components/TabBar';
import _ from 'lodash';
import style from '../scss/cards.module.scss';

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

  // 정렬 스타일 상태
  const [alignStyle, setAlignStyle] = useState(style.rowAlign);

  const [userInfo, setUserInfo] = useState({
    infoList: [], // 받아온 전체 유저 데이터
    sortedList: [], // 순위 정렬후 50개만 추출한 데이터
    loaded: false, // api 재요청 차단용
  });

  const onUserAdd = useCallback(
    (getInfo) => {
      setUserInfo((info) => {
        const newInfos = _.cloneDeep(info);
        newInfos.infoList = newInfos.infoList.concat(getInfo);
        if (data.userList.length === newInfos.infoList.length) {
          let newArr = [];
          newInfos.infoList.forEach((item, i) => {
            newArr[i] = {};
            newArr[i].id = item.id;
            newArr[i].karma = item.karma;
          });
          // 순서 정렬
          const sortList = newArr.sort((a, b) => {
            return Number(b.karma) - Number(a.karma);
          });
          const uniqList = _.uniqBy(sortList, 'id'); // 중복 값 제거
          const sliceList = uniqList.slice(0, 50); // 앞 50개만 추출

          newInfos.sortedList = sliceList;
          newInfos.loaded = true;
        }
        return newInfos;
      });
    },
    [data.userList.length],
  );

  // tab 컴포넌트 리스트
  const tabs = {
    post: <CardList type="topstories" data={data} setData={setData} />,
    user: (
      <UserRank
        userList={data.userList}
        userInfo={userInfo}
        onUserAdd={onUserAdd}
      />
    ),
  };

  // 선택된 탭 관리 상태
  const [selectTab, setSelectTab] = useState('post');

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

      {data.loadCompletion && (
        <TabBar
          tabs={['post', 'user']}
          selectTab={selectTab}
          setSelectTab={setSelectTab}
        />
      )}

      {data.loadCompletion && selectTab === 'post' ? (
        <>
          <Align
            setData={setData}
            setCurrentPageIng={setCurrentPageIng}
            setAlignStyle={setAlignStyle}
          />
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
