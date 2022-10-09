import { Container, makeStyles } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: 'url(./banner2.jpeg)',
  },
  bannerContent: {
    height: 400,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around',
  },
}));

const Banner = () => {
  const MUIclasses = useStyles();

  return (
    <div classeName={MUIclasses.banner}>
      <Container classeName={MUIclasses.bannerContent}></Container>
    </div>
  );
};

export default Banner;
