import { useLocation } from 'react-router-dom';
import useGetData from '../lib/useGetData';
import styled from 'styled-components';
import SubmitList from '../components/user/SubmitList';

const UserWrap = styled('div')`
  position: relative;
  padding: 29px 20px;
`;
const UserInfo = styled('section')`
  padding: 24px 16px 10px;
  background-color: var(--card-item-bg);
  box-shadow: var(--card-item-shadow);
  border-radius: 8px;
  h2 {
    color: var(--card-item-title);
    font-size: 2.2rem;
    font-weight: 700;
    margin-bottom: 12px;
  }
  > .info {
    padding: 10px 0;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    font-weight: 500;
    color: var(--card-item-title);
    span {
      border: 1px solid var(--theme-color);
      color: var(--theme-color);
      padding: 2px 7px;
      border-radius: 10px;
      margin-right: 4px;
      &:nth-child(2) {
        margin-left: 10px;
      }
    }
  }
  .about {
    font-size: 1.4rem;
    color: var(--user-about);
    font-weight: 400;
    padding: 24px 0;
  }
`;
const UserSub = styled('section')``;

const User = () => {
  const location = useLocation();
  const userId = location.pathname.split('/user/')[1]; // 조회할 user id

  const [loading, resolved, error] = useGetData('user', userId);
  if (loading) return null;
  if (error) return console.log('에러발생');
  if (!resolved) return null;

  return (
    <UserWrap>
      <UserInfo>
        <h2>{resolved.id}</h2>
        <div className="info">
          <span>Joined</span> {resolved.created} <span>karma</span>{' '}
          {resolved.karma}
        </div>
        {resolved.about && <div className="about">{resolved.about}</div>}
      </UserInfo>
      <UserSub>
        <SubmitList ids={resolved.submitted} />
      </UserSub>
    </UserWrap>
  );
};

export default User;
