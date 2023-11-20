import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons';
import Slider from 'react-slick';

export default function Carousel() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <ArrowRightIcon />,
    prevArrow: <ArrowLeftIcon />,
  };

  return (
    <>
      <Slider {...settings}>
        <div>
          <img src="https://placekitten.com/300/200" alt="Slide 1" />
        </div>
      </Slider>
    </>
  );
}
