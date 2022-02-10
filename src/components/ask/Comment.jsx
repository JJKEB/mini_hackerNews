import React from 'react';
import CommentItem from './CommentItem';
import styled from 'styled-components';

const ItemBlock = styled('div')`
  .comment-inner {
    margin-bottom: 14px;
    padding: 5px 10px 15px;
    border-radius: 8px;
    .comment-head {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
      .by {
        font-size: 1.4rem;
        color: var(--comment-txt);
        font-weight: 600;
        display: flex;
        align-items: center;
        margin-right: 10px;
        img {
          margin-right: 7px;
          filter: var(--comment-profile-color);
        }
      }
      .time {
        display: flex;
        align-items: center;
        font-size: 1.4rem;
        color: #b7b7b7;
        img {
          margin-right: 5px;
        }
      }
    }
    .comment-body {
      > div {
        word-break: normal;
        font-size: 1.4rem;
        color: var(--comment-txt);
        line-height: 1.4;
        a {
          color: var(--comment-txt);
        }
        p,
        pre {
          word-break: keep-all;
          white-space: initial;
        }
      }
    }
  }
  .comment-child {
    padding-left: 10px;
  }

  > .inner {
    padding: 10px 0;
    /* border-bottom: 1px solid #ccc; */
    > div {
      > div {
        .comment-inner {
          background-color: var(--comment-item-bg);
          padding: 20px 10px 15px;
        }
      }
    }
  }
`;

const Comment = ({ kids }) => {
  return (
    <ItemBlock>
      <div className="inner">
        {kids.map((id) => (
          <CommentItem key={id} id={id} />
        ))}
      </div>
    </ItemBlock>
  );
};

export default Comment;
