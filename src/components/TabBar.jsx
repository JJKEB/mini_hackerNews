import React, { useCallback } from 'react';
import styled from 'styled-components';

const TabBtns = styled.div`
  padding: 0 20px;
  margin-top: 20px;
  .inner {
    background-color: var(--tab-bar-bg);
    border: 1px solid var(--tab-bar-bd);
    border-radius: 50px;
    padding: 4px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
  }
  button {
    flex: 1 0 auto;
    background-color: transparent;
    border: 0;
    font-size: 1.2rem;
    font-weight: 500;
    color: #b7b7b7;
    border-radius: 50px;
    cursor: pointer;
    transition: 0.1s;
    height: 36px;
    text-transform: capitalize;

    &.active {
      background-color: #ed702d;
      color: #fff;
    }
  }
`;

const TabBar = ({ tabs, selectTab, setSelectTab }) => {
  const changeTab = useCallback(
    (nextTab) => {
      setSelectTab(nextTab);
    },
    [setSelectTab],
  );

  return (
    <TabBtns className="tabs">
      <div className="inner">
        {tabs.map((tabName) => {
          return (
            <button
              key={tabName}
              onClick={() => changeTab(tabName)}
              className={selectTab === tabName ? 'active' : ''}
            >
              {tabName}
            </button>
          );
        })}
      </div>
    </TabBtns>
  );
};

export default TabBar;
