import { Button, ButtonGroup, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import SelectButton from '../SelectButton';
import Caroussel from './Caroussel';
import { GlobalState } from '../../context/Context';

const Banner = () => {
  const { market, setMarket } = GlobalState();

  const useStyles = makeStyles(() => ({
    banner: {
      backgroundImage: 'url(./images/banner2.jpg)',
    },
    bannerContent: {
      height: 600,
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
            Track your favourite cryptos and shares with React
          </Typography>
          <div
            style={{
              display: 'flex',
              marginTop: 20,
              justifyContent: 'space-around',
              width: '100%',
            }}
          >
            <SelectButton onClick={() => setMarket('crypto')} selected={market === 'crypto'}>
              Crypto
            </SelectButton>
            <SelectButton onClick={() => setMarket('share')} selected={market === 'share'}>
              Shares
            </SelectButton>
          </div>

          <Caroussel />
        </div>
      </Container>
    </div>
  );
};

export default Banner;
