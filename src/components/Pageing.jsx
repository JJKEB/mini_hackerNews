import React, { useCallback } from 'react';
import _ from 'lodash';

const Pageing = ({ data, setData, currentPageIng, setCurrentPageIng }) => {
  const pageSort = useCallback(
    (prev, next) => {
      setData((data) => {
        const newData = _.cloneDeep(data);
        // 페이지 번호가 변경됬을시
        if (prev !== next) {
          // 페이징용 저장된 리스트가 없을때 리스트 분할 복사
          if (newData.tempList.length === 0) {
            let divideList = [];
            for (let i = 0; i < newData.showList.length; i++) {
              const indexNum = Math.floor(i / newData.pageingNum);
              if (divideList[indexNum] === undefined) {
                divideList[indexNum] = [];
              }
              divideList[indexNum].push(newData.showList[i]);
            }
            newData.tempList = divideList;
          }
          newData.showList = newData.tempList[next - 1];
        }
        return newData;
      });
    },
    [setData],
  );

  const onPageIng = useCallback(
    (e, totalLength) => {
      setCurrentPageIng((currentPageIng) => {
        let nextPage = currentPageIng;
        if (e.target.value === 'prev' && currentPageIng > 1) {
          nextPage = currentPageIng - 1;
        }
        if (e.target.value === 'next' && currentPageIng < totalLength) {
          nextPage = currentPageIng + 1;
        }
        pageSort(currentPageIng, nextPage);
        return nextPage;
      });
    },
    [setCurrentPageIng, pageSort],
  );

  return (
    <>
      <button
        onClick={(e) =>
          onPageIng(e, Math.ceil(data.showItems.length / data.pageingNum))
        }
        value="prev"
      >
        prev
      </button>
      {currentPageIng}/{Math.ceil(data.showItems.length / data.pageingNum)}
      <button
        onClick={(e) =>
          onPageIng(e, Math.ceil(data.showItems.length / data.pageingNum))
        }
        value="next"
      >
        next
      </button>
    </>
  );
};

export default React.memo(Pageing);
