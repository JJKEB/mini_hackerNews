import React from 'react';
import { useParams } from 'react-router-dom';
import useGetData from '../lib/useGetData';
import Comment from '../components/ask/Comment';
import styled from 'styled-components';
import { txtSplit, lastTime, getInnerHtml } from '../lib/utils';
import comment from '../assets/ico_comment.svg';
import profile from '../assets/ico_comment_profile.svg';

const AskWrap = styled('div')`
  .ask-head {
    margin-bottom: 20px;
    padding: 20px;
    background-color: var(--comment-bg);
    box-shadow: var(--card-item-shadow);
    .user-info {
      display: flex;
      border-bottom: 1px solid #b7b7b7;
      padding-bottom: 10px;
      margin-bottom: 15px;
      .profile-img {
        margin-right: 10px;
        img {
          width: 33px;
          filter: var(--comment-profile-color);
        }
      }
      .profile-txt {
        .by {
          font-weight: 500;
          font-size: 1.8rem;
          color: var(--card-item-title);
          margin-bottom: 3px;
        }
        p {
          font-size: 1.2rem;
          color: #949494;
        }
      }
    }
  }
  .subject {
    font-size: 2.2rem;
    font-weight: 700;
    color: var(--card-item-title);
    margin-bottom: 15px;
    flex-basis: 100%;
    line-height: 1.3;
    > a {
      color: var(--card-item-title);
      display: block;
      text-decoration: none;
    }
    span {
      color: var(--theme-color);
    }
  }
  .user-about {
    font-size: 1.8rem;
    font-weight: 400;
    line-height: 1.4;
    color: var(--card-item-title);
    p,
    pre {
      word-break: keep-all;
      white-space: initial;
    }
  }
`;

const CommentWrap = styled('div')`
  background-color: var(--comment-bg);
  padding: 10px 20px;
  .comment-top {
    display: flex;
    justify-content: end;
    span {
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
  > div {
    > div {
      > div {
        border-bottom: 1px solid #c9c9c9;
        margin-bottom: 30px;
      }
    }
  }
`;

const AskView = () => {
  const { id } = useParams();

  const [loading, resolved, error] = useGetData('item', id);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  return (
    <AskWrap>
      <div className="ask-head">
        <div className="user-info">
          <div className="profile-img">
            <img src={profile} alt="" />
          </div>
          <div className="profile-txt">
            <div className="by">{resolved.by}</div>
            <p>
              <span>{resolved.score} points</span> &sdot;{' '}
              <span>{lastTime(resolved.time)}</span>
            </p>
          </div>
        </div>
        <div className="subject">{txtSplit(resolved.title, 'HN:')}</div>
        <div className="user-about">{getInnerHtml(resolved.text)}</div>
      </div>

      {resolved.kids && (
        <CommentWrap>
          <div className="comment-top">
            <span>
              <img src={comment} alt="" /> {resolved.kids.length}
            </span>
          </div>
          {resolved.kids && <Comment kids={resolved.kids} />}
        </CommentWrap>
      )}
    </AskWrap>
  );
};

export default React.memo(AskView);
