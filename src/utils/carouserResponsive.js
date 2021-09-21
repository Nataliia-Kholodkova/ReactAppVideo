const calcNumSlides = (numItems) => {
  const responsive = {
    extraDesktop: {
      breakpoint: { max: 4000, min: 1600 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 1600, min: 960 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 960, min: 689 },
      items: 3,
    },
    mobileBig: {
      breakpoint: { max: 689, min: 468 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 468, min: 0 },
      items: 1,
    }
  };

  if (numItems < responsive.desktop.items) {
    responsive.desktop.items = numItems;
  }
  if (numItems < responsive.extraDesktop.items) {
    responsive.extraDesktop.items = numItems;
  }
  if (numItems < responsive.tablet.items) {
    responsive.tablet.items = 2;
  }
  return responsive;
};

export default calcNumSlides;
