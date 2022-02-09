import RankItem from './RankItem';
import Progress from '../../components/Progress';
import styled from 'styled-components';

import trophy from '../../assets/ico_trophy.svg';
import medal_1 from '../../assets/ico_medal_1.svg';
import medal_2 from '../../assets/ico_medal_2.svg';
import medal_3 from '../../assets/ico_medal_3.svg';

const medals = [medal_1, medal_2, medal_3];
const RankWrap = styled('section')``;
const RankTitle = styled('h2')`
  font-size: 2rem;
  font-weight: 700;
  color: var(--user-ranking-title);
  padding: 18px 20px;
  display: flex;
  align-items: center;
  img {
    margin-left: 7px;
  }
`;
const RankHead = styled('div')`
  background-color: #eaf4f8;
  > div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 700px;
    margin: 0 auto;
    box-sizing: border-box;
    padding: 0 20px;
    font-size: 1.4rem;
    font-weight: 500;
    color: #727272;
    height: 44px;
    span {
      flex: 1 0 33.3333%;
      text-align: center;
    }
  }
`;
const RankUl = styled('ul')`
  li {
    box-sizing: border-box;
    > div {
      display: flex;
      padding: 10px 20px;
      max-width: 700px;
      margin: 0 auto;
      box-sizing: border-box;
      span {
        flex: 1 0 33.3333%;
        box-sizing: border-box;
        font-size: 1.4rem;
        font-weight: 500;
        color: #202020;
        text-align: center;
        img {
          vertical-align: bottom;
        }
        &:nth-child(3) {
          color: var(--theme-color);
        }
      }
    }
    &:nth-child(odd) {
      background-color: var(--user-ranking-oddBg);
      > div {
        span {
          color: var(--user-ranking-oddColor);
          &:nth-child(3) {
            color: var(--theme-color);
          }
        }
      }
    }
    &:nth-child(even) {
      background-color: #eaf4f8;
    }
  }
`;
const RankLi = styled('li')``;

const User = ({ userList, userInfo, onUserAdd }) => {
  return (
    <>
      <Progress
        active={true}
        progress={Math.floor(
          (userInfo.infoList.length / userList.length) * 100,
        )}
        style={{ position: 'absolute', left: 0, top: 0, width: '100%' }}
      />
      {!userInfo.loaded &&
        userList.map((user, i) => (
          <RankItem key={i} userName={user} onUserAdd={onUserAdd} />
        ))}
      {userInfo.loaded && (
        <RankWrap>
          <RankTitle>
            User Ranking <img src={trophy} alt="" />
          </RankTitle>
          <RankHead>
            <div>
              <span>Rank</span> <span>User Name</span> <span>Karma</span>
            </div>
          </RankHead>
          <RankUl>
            {userInfo.sortedList.map((item, i) => (
              <RankLi key={i}>
                <div>
                  <span style={i + 1 < 4 ? { textIndent: '-18px' } : {}}>
                    {i + 1 < 4 && <img src={medals[i]} alt="" />} {i + 1}
                  </span>
                  <span>{item.id}</span>
                  <span>{item.karma}</span>
                </div>
              </RankLi>
            ))}
          </RankUl>
        </RankWrap>
      )}
    </>
  );
};

export default User;
