import React from 'react';
import Star from '../components/Image/SVG/Star';

const calculateStars = (rating) => {
  const starNum = Math.ceil(rating / 2);
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(<Star key={i.toString()} classNames={i <= starNum ? ['star', 'active'] : ['star']} />);
  }
  return stars;
};

export default calculateStars;
