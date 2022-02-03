import styled from 'styled-components';
import gsap from 'gsap';
import imgScrollUp from '../assets/btn_scroll_up.svg';
import { Controller, Scene } from 'react-scrollmagic';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

const FooterBlock = styled.footer`
  height: 50px;
`;
const BtnScrollTo = styled.button`
  position: fixed;
  z-index: 2;
  right: 15px;
  bottom: -50px;
  background-color: transparent;
  border: 0;
  transition: 0.5s;
  cursor: pointer;

  &.active {
    bottom: 10px;
  }
`;

const Footer = () => {
  return (
    <FooterBlock className="footer">
      <Controller>
        <Scene offset={800} classToggle="active" triggerElement="#wrap">
          <BtnScrollTo
            onClick={() => gsap.to(window, { duration: 0.5, scrollTo: 0 })}
          >
            <img src={imgScrollUp} alt="" />
          </BtnScrollTo>
        </Scene>
      </Controller>
    </FooterBlock>
  );
};

export default Footer;
