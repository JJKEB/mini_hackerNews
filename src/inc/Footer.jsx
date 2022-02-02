import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

const FooterBlock = styled.footer`
  /* background-color: #ed702d; */
  height: 50px;
`;

const Footer = () => {
  return (
    <FooterBlock className="footer">
      <button onClick={() => gsap.to(window, { duration: 0.5, scrollTo: 0 })}>
        UP
      </button>
    </FooterBlock>
  );
};

export default Footer;
