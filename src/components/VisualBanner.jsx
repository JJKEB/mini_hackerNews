import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import bn from '../assets/bn/banner.png';
import bn_top from '../assets/bn/banner_top.png';
import bn_new from '../assets/bn/banner_new.png';
import bn_show from '../assets/bn/banner_show.png';
import bn_ask from '../assets/bn/banner_ask.png';
import bn_job from '../assets/bn/banner_job.png';

const banners = {
  default: { index: 0, bg: '#000' },
  top: { index: 1, bg: '#000' },
  new: { index: 2, bg: '#333333' },
  show: { index: 3, bg: '#000' },
  ask: { index: 4, bg: '#000' },
  job: { index: 5, bg: '#fdfcfd' },
};

const VisualBn = styled('div')`
  background-color: #efefef;
  img {
    display: block;
    width: 100%;
    vertical-align: top;
  }
  div {
    vertical-align: top;
  }
  > .inner {
    > div {
      max-width: 650px;
      margin: 0 auto;
    }
  }
`;

const VisualBanner = ({ path }) => {
  const currentPath = path.split('/')[1];
  const currentParams = path.split('/')[2]; // Params 값이 있으면 배너을 띄우지 않음

  const Bn = useRef();
  const settings = {
    swipe: false,
    dots: false,
    arrows: false,
    fade: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  useEffect(() => {
    const indexNum =
      currentPath === ''
        ? banners['default'].index
        : banners[currentPath].index;
    Bn.current.slickGoTo(indexNum);
  }, [currentPath]);

  return (
    <>
      {!currentParams && (
        <VisualBn>
          <div
            className="inner"
            style={
              currentPath === ''
                ? { backgroundColor: banners['default'].bg }
                : { backgroundColor: banners[currentPath].bg }
            }
          >
            <Slider {...settings} ref={Bn}>
              <div>
                <img src={bn} alt="" />
              </div>
              <div>
                <img src={bn_top} alt="" />
              </div>
              <div>
                <img src={bn_new} alt="" />
              </div>
              <div>
                <img src={bn_show} alt="" />
              </div>
              <div>
                <img src={bn_ask} alt="" />
              </div>
              <div>
                <img src={bn_job} alt="" />
              </div>
            </Slider>
          </div>
        </VisualBn>
      )}
    </>
  );
};

export default VisualBanner;
