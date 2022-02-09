import React, { useState, useEffect, useCallback } from 'react';
import Item from './Item';
import AddData from './AddData';
import TabBar from '../TabBar';
import Progress from '../../components/Progress';
import _ from 'lodash';

const SubmitList = ({ ids }) => {
  const [submitteds, setSubmitteds] = useState({
    limit: 100, // submitted 조회 제한 갯수
    totals: [], // 조회한 submitted 반환값들
    searchIds: [],
    searchNum: 100, // 조회될 submitted 갯수 inquiryLimit()에 따라 변동됨
  });

  const [done, setDone] = useState(false);
  const [comments, setComments] = useState([]);
  const [storys, setStorys] = useState([]);
  const [tabs, setTabs] = useState(['submissions']);

  // 선택된 탭 관리 상태
  const [selectTab, setSelectTab] = useState(tabs[0]);

  useEffect(() => {
    setSubmitteds((submits) => {
      const newSubmits = _.cloneDeep(submits);
      if (ids.length <= newSubmits.limit) {
        newSubmits.searchIds = ids;
        newSubmits.searchNum = ids.length;
      }
      if (ids.length > newSubmits.limit)
        newSubmits.searchIds = ids.slice(0, newSubmits.limit);
      return newSubmits;
    });
  }, [ids]);

  useEffect(() => {
    if (done) {
      setComments(() =>
        submitteds.totals.filter((item) => item.type === 'comment'),
      );
      setStorys(() =>
        submitteds.totals.filter((item) => item.type === 'story'),
      );
      setTabs((tabs) => {
        const newTabs = Object.assign([], tabs);
        comments.length > 0 && newTabs.push('comments');
        storys.length > 0 && newTabs.push('favorites');

        return newTabs;
      });
    }
  }, [comments.length, done, storys.length, submitteds.totals]);

  const onAdd = useCallback((newItem) => {
    setSubmitteds((submits) => {
      const newSubmits = _.cloneDeep(submits);
      newSubmits.totals = newSubmits.totals.concat(newItem);
      if (newSubmits.totals.length === newSubmits.searchNum)
        setDone(() => true);
      return newSubmits;
    });
  }, []);

  return (
    <>
      <Progress
        active={true}
        progress={Math.floor(
          (submitteds.totals.length / submitteds.searchNum) * 100,
        )}
        style={{ position: 'absolute', left: 0, top: 0, width: '100%' }}
      />

      {done && (
        <TabBar
          tabs={[...tabs]}
          selectTab={selectTab}
          setSelectTab={setSelectTab}
        />
      )}

      <ul style={{ paddingTop: '20px' }}>
        {submitteds.searchIds.map((id) => {
          return <AddData key={id} id={id} onAdd={onAdd} done={done} />;
        })}

        {selectTab === 'submissions' &&
          submitteds.totals.map((data, i) => {
            return <Item key={i} data={data} />;
          })}

        {selectTab === 'comments' &&
          comments.map((data, i) => {
            return <Item key={i} data={data} />;
          })}
        {selectTab === 'favorites' &&
          storys.map((data, i) => {
            return <Item key={i} data={data} />;
          })}
      </ul>
    </>
  );
};

export default SubmitList;
