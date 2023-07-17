import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState } from "react";


const SliderData = () => {

  const sliderRef = useRef();
  var settings = {
    dots: true,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    // slickGoTo: data || 5,
  };


  console.log('click', settings)

  const handleClick = () => {
    sliderRef.current.slickGoTo(1);
  }

  return (
    <>
      <Slider {...settings} ref={sliderRef}>
        {[1, 2, 3, 4, 5, 6].map((item) => {
          return (
            <div key={item}>
              <h3>{item}</h3>
            </div>
          )
        })}
      </Slider>

      <div style={{ marginTop: 100 }}>

        <button type="button" onClick={handleClick}> Submit </button>
      </div>
    </>
  )
};

export default SliderData;
