import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { GlobalState } from '../../context/Context';
import { TrendingCoins } from '../../config/api';
import AliceCarousel from 'react-alice-carousel';
import { Link } from 'react-router-dom';

// Regex to put a comma every 3 digits
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

const Caroussel = () => {
  const { currency, symbol, topNasdaqCompanies, market } = GlobalState();
  const [trending, setTrending] = useState([]);

  // We use axios to help us fetching the API data from CoinGecko
  // It's async function so we use await, get loaded only once when loading the banner (main page)
  // or currency change (see below)
  // We directly do destructuring on { data } and pass currency as parameter to TrendingCoins
  // otherwise would be data.data
  // No need to lowercase since it's URL
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));
    setTrending(data);
  };

  // Everytime the currency change, we fetch the API again to get new prices
  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  const useStyles = makeStyles((theme) => ({
    carousel: {
      height: '50%',
      display: 'flex',
      alignItems: 'center',
    },
    carouselItem: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      cursor: 'pointer',
      textTransform: 'uppercase',
      color: 'white',
      marginTop: '6vh',
    },
  }));

  const MUIclasses = useStyles();

  const responsive = {
    0: {
      items: 2,
    },
    512: {
      items: 4,
    },
  };

  // Items are all the coins we display in the caroussel
  const shareItems = topNasdaqCompanies.map((share) => {
    // If the price_change_percentage is >= 0, there was profit
    // We will use it to display red or green profit percentage
    let profit = share?.changes >= 0;

    return (
      // Link to the coin page

      <Link className={MUIclasses.carouselItem} to={`/shares/${share.symbol}`}>
        <img src={share?.image} alt={share.name} height="80" style={{ marginBottom: 10 }} />
        <span>
          {share?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
              fontWeight: 500,
            }}
          >
            {profit && '+'}
            {share?.changes?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {/* We put a comma in the current price every 3 digits and only displays the last 2 digits (rounded) */}$ {numberWithCommas(share?.price.toFixed(2))}
        </span>
      </Link>
    );
  });

  const cryptoItems = trending.map((coin) => {
    // If the price_change_percentage is >= 0, there was profit
    // We will use it to display red or green profit percentage
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
      // Link to the coin page

      <Link className={MUIclasses.carouselItem} to={`/coins/${coin.id}`}>
        <img src={coin?.image} alt={coin.name} height="80" style={{ marginBottom: 10 }} />
        <span>
          {coin?.symbol}
          &nbsp;
          <span
            style={{
              color: profit > 0 ? 'rgb(14, 203, 129)' : 'red',
              fontWeight: 500,
            }}
          >
            {profit && '+'}
            {coin?.price_change_percentage_24h?.toFixed(2)}%
          </span>
        </span>
        <span style={{ fontSize: 22, fontWeight: 500 }}>
          {/* We put a comma in the current price every 3 digits and only displays the last 2 digits (rounded) */}
          {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
        </span>
      </Link>
    );
  });

  return (
    <div className={MUIclasses.carousel}>
      <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={market === 'crypto' ? cryptoItems : shareItems}
        autoPlay
      />
    </div>
  );
};

export default Caroussel;
