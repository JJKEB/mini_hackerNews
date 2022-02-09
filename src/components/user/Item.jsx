import React from 'react';
import { useVisibilityHook } from 'react-observer-api';
import { lastTime, txtSplit, isDomain } from '../../lib/utils';
import styled from 'styled-components';
import icoBy from '../../assets/ico_profile.svg';
import icoComment from '../../assets/ico_comment.svg';

const StyledItem = styled('div')`
  position: relative;
  padding: 29px 20px;
  background-color: var(--card-item-bg);
  border-radius: 8px;
  box-shadow: var(--card-item-shadow);
  margin-bottom: 16px;
  box-sizing: border-box;
  .inner {
  }
  .title {
    font-size: 1.6rem;
    font-weight: 700;
    color: var(--card-item-title);
    margin-bottom: 14px;
    flex-basis: 100%;
    margin-bottom: 5px;
    span {
      color: var(--theme-color);
    }
  }
  .txt {
    font-size: 1.2rem;
    font-weight: 400;
    color: var(--card-item-title);
    margin-bottom: 5px;
    line-height: 1.4;
  }
  .url {
    display: inline-block;
    font-size: 1.2rem;
    color: var(--card-item-by);
    font-weight: 400;
    margin-top: 5px;
  }
  .info-wrap {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-basis: 100%;
    box-sizing: border-box;
    padding-top: 20px;
    .infos {
      flex: 1 1;
      display: flex;
      align-items: center;
      .by {
        display: inline-flex;
        align-items: center;
        font-size: 1.2rem;
        color: var(--card-item-by);
        font-weight: 500;
        text-decoration: none;
        margin-right: 5px;
        img {
          margin-right: 4px;
        }
      }
      .score {
        display: inline-flex;
        align-items: flex-end;
        font-size: 1.2rem;
        color: #949494;
        font-weight: 400;
        margin-right: 10px;
        img {
          margin-right: 3px;
        }
      }
      .time {
        display: flex;
        align-items: center;
        font-size: 1.2rem;
        color: #949494;
        img {
          margin-right: 3px;
        }
      }
    }
    .comment {
      display: flex;
      align-items: center;
      font-size: 1.2rem;
      color: var(--theme-color);
      font-weight: 500;
      img {
        margin-right: 3px;
      }
    }
  }
`;

const Item = ({ data }) => {
  const { setElement, isVisible } = useVisibilityHook();
  return (
    <StyledItem ref={setElement}>
      {isVisible && (
        <div className="inner">
          <div className="title">
            {data.title && txtSplit(data.title, 'HN:')}
          </div>
          <div className="txt">{data.text && data.text}</div>
          <a href={data.url} target="_blank" rel="noreferrer" className="url">
            {data.url && isDomain(data.url)}
          </a>
          <div className="info-wrap">
            <div className="infos">
              <span className="by">
                <img src={icoBy} alt="" />
                {data.by}
              </span>
              {data.score && <span className="score">{data.score} points</span>}
              <span className="time">{lastTime(data.time)}</span>
            </div>
            {data.kids && (
              <div className="comment">
                <img src={icoComment} alt="" />
                {data.kids.length}
              </div>
            )}
          </div>
        </div>
      )}
    </StyledItem>
  );
};

export default Item;
