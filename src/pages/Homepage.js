import React from 'react';
import Banner from '../components/Banner/Banner';
import CoinsTable from '../components/Coin/CoinsTable';
import ShareTable from '../components/Share/ShareTable';
import { GlobalState } from '../context/Context';

const Homepage = () => {
  const { market } = GlobalState();

  return (
    <>
      <Banner />
      {market === 'crypto' ? <CoinsTable /> : <ShareTable />}
    </>
  );
};

export default Homepage;
