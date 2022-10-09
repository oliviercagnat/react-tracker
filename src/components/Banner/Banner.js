import { Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import Caroussel from './Caroussel';

const useStyles = makeStyles(() => ({
  banner: {
    backgroundImage: 'url(./images/banner2.jpg)',
  },
  bannerContent: {
    height: 500,
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 25,
    justifyContent: 'space-around',
  },
  tagline: {
    display: 'flex',
    height: '40%',
    flexDirection: 'column',
    justifyContent: 'center',
    textAlign: 'center',
  },
}));

const Banner = () => {
  const MUIclasses = useStyles();

  return (
    <div className={MUIclasses.banner}>
      <Container className={MUIclasses.bannerContent}>
        <div className={MUIclasses.tagline}>
          <Typography
            variant="h2"
            style={{
              fontWeight: 'bold',
              marginBottom: 15,
              fontFamily: 'Montserrat',
            }}
          >
            React Tracker
          </Typography>
          <Typography
            variant="subtitle2"
            style={{
              color: 'darkgrey',
              fontFamily: 'Montserrat',
            }}
          >
            Track your favourite cryptos with React
          </Typography>
          <Caroussel />
        </div>
      </Container>
    </div>
  );
};

export default Banner;
