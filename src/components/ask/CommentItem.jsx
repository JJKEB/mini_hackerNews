import React from 'react';
import useGetData from '../../lib/useGetData';
import Comment from './Comment';
import { lastTime, getInnerHtml } from '../../lib/utils';
import styled from 'styled-components';
import profile from '../../assets/ico_comment_profile.svg';
import time from '../../assets/ico_time.svg';

const ItemEl = styled('div')`
  /* border: 1px solid #000;
  padding: 5px;
  background-color: #fff; */
`;

const CommentItem = ({ id }) => {
  const [loading, resolved, error] = useGetData('item', id);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  return (
    <>
      {resolved.text ? (
        <ItemEl>
          <div className="comment-inner">
            <div className="comment-head">
              <span className="by">
                <img src={profile} alt="" />
                {resolved.by}
              </span>
              {resolved.time && (
                <span className="time">
                  <img src={time} alt="" /> {lastTime(resolved.time)}
                </span>
              )}
            </div>

            <div className="comment-body">{getInnerHtml(resolved.text)}</div>
          </div>

          <div className="comment-child">
            {resolved.kids && <div>{<Comment kids={resolved.kids} />}</div>}
          </div>
        </ItemEl>
      ) : null}
    </>
  );
};

export default CommentItem;
