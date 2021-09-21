import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import CarouselForActors from './CarouselMapActors';
import CarouselForShows from './CarouselMapShows';
import calcNumSlides from '../../../utils/carouserResponsive';

const CarouselConponent = ({ items, isActor, bigHover }) => (
    <Carousel
      swipeable={false}
      draggable={false}
      showDots={true}
      responsive={calcNumSlides(items.length)}
      infinite={true}
      // centerMode={true}
      keyBoardControl={true}
      customTransition="all .5s linear"
      containerClass="carousel-container"
      // removeArrowOnDeviceType={['tablet', 'mobile']}
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
    >
      {items.map(
        (item) => isActor
          ? <CarouselForActors item={item.person} key={item.person.id} />
          : <CarouselForShows item={item} key={item.id} bigHover />
      )
      }
    </Carousel>
);

export default CarouselConponent;
