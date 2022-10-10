import { makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { SingleCoin } from '../config/api';
import { CurrencyState } from '../context/Context';
import CoinInfo from './CoinInfo';

const CoinPage = () => {
  // we take the ID from the URL and use it to fetch one single coin
  const { id } = useParams();
  const [coin, setCoin] = useState();
  const { currency, symbol } = CurrencyState();

  const fetchCoin = async () => {
    const { data } = await axios.get(SingleCoin(id));
    setCoin(data);
  };

  // No params since we need useEffect just once
  useEffect(() => {
    fetchCoin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      // MUI API: Whenever screen switch to md, align center
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    sidebar: {
      width: '30%',
      [theme.breakpoints.down('md')]: {
        width: '100%',
      },
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 25,
      borderRight: '2px solid grey',
    },
    heading: {
      fontWeight: 'bold',
      marginBottom: 20,
      fontFamily: 'Montserrat',
    },
  }));

  const MUIclasses = useStyles();

  return (
    <div className={MUIclasses.container}>
      <div className={MUIclasses.sidebar}>
        <img src={coin?.image.large} alt={coin?.name} height="200" style={{ marginBottom: 20 }} />
        <Typography variant="h3" className={MUIclasses.heading}>
          {coin?.name}
        </Typography>
        <Typography variant="subtitle1" className={MUIclasses.description}>
          {coin?.description.en.split('. '[0])}.
        </Typography>
      </div>
      <CoinInfo />
    </div>
  );
};

export default CoinPage;
