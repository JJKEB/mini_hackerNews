import React from 'react';
import styled from 'styled-components';
import Lnb from './Lnb';

const HeaderBlock = styled.header`
  background-color: #ed702d;
`;

const Header = () => {
  return (
    <HeaderBlock>
      <h1>svelte Hacker news</h1>
      <Lnb />
    </HeaderBlock>
  );
};

export default Header;
