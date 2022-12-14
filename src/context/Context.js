import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { NasdaqList } from '../config/api';
import { TopNasdaqList } from '../config/api';

// We create a
const GlobalContext = createContext();

const Context = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  // NASDAQ
  const [nasdaqCompanies, setNasdaqCompanies] = useState([]);
  const [topNasdaqCompanies, setTopNasdaqCompanies] = useState([]);
  const [market, setMarket] = useState('crypto');

  const FetchNasdaqList = async () => {
    const data = await axios.get(NasdaqList());
    setNasdaqCompanies(data.data);
  };

  const FetchTopNasdaqList = async () => {
    const data = await axios.get(TopNasdaqList());
    setTopNasdaqCompanies(data.data);
  };

  // useEffect runs everytime currency changes
  // it will trigger setSymbol and change it accordingly
  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'EUR') setSymbol('€');
    if (nasdaqCompanies.length === 0) FetchNasdaqList();
    if (topNasdaqCompanies.length === 0) FetchTopNasdaqList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  // We export the values to make them available in all our app
  return (
    <GlobalContext.Provider value={{ currency, setCurrency, symbol, nasdaqCompanies, market, setMarket, topNasdaqCompanies }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default Context;

// We export the GlobalState to make it available everywhere
export const GlobalState = () => {
  return useContext(GlobalContext);
};
