import React, { useCallback } from 'react';
import _ from 'lodash';
import styled from 'styled-components';

const PageIngBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PageIngStatus = styled.div`
  border: 1px solid #dfdfdf;
  background-color: #fff;
  height: 30px;
  display: inline-flex;
  align-items: center;
  padding: 0 18px;
  margin: 0 30px;
  font-size: 1.4rem;
  font-weight: 500;
  letter-spacing: 3px;
  border-radius: 30px;
`;
const PagingBtn = styled.button`
  position: relative;
  border: 1px solid #dfdfdf;
  background: #fff;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  cursor: pointer;
  &:after {
    content: '';
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -4px;
    margin-top: -4px;
    width: 8px;
    height: 8px;
    border-top: 2px solid #000;
    border-right: 2px solid #000;
    transform-origin: 5px 2px;
    transform: rotate(45deg);
    transform: rotate(${(props) => props.value === 'prev' && '-135deg'});
    transform-origin: ${(props) => props.value === 'prev' && '5px 4px'};
  }
`;

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
    <PageIngBar>
      <PagingBtn
        onClick={(e) =>
          onPageIng(e, Math.ceil(data.showItems.length / data.pageingNum))
        }
        value="prev"
      />
      <PageIngStatus>
        {currentPageIng}/{Math.ceil(data.showItems.length / data.pageingNum)}
      </PageIngStatus>
      <PagingBtn
        onClick={(e) =>
          onPageIng(e, Math.ceil(data.showItems.length / data.pageingNum))
        }
        value="next"
      />
    </PageIngBar>
  );
};

export default React.memo(Pageing);
