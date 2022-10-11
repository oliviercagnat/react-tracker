import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { NasdaqList } from '../config/api';

// We create a
const CurrencyContext = createContext();

const Context = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  // NASDAQ
  const [nasdaqCompanies, setNasdaqCompanies] = useState([]);
  const [market, setMarket] = useState('crypto');

  const FetchNasdaqList = async () => {
    const data = await axios.get(NasdaqList());
    setNasdaqCompanies(data.data);
  };

  // useEffect runs everytime currency changes
  // it will trigger setSymbol and change it accordingly
  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'EUR') setSymbol('€');
    if (nasdaqCompanies.length === 0) FetchNasdaqList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);

  // We export the values to make them available in all our app
  return <CurrencyContext.Provider value={{ currency, setCurrency, symbol, nasdaqCompanies, market, setMarket }}>{children}</CurrencyContext.Provider>;
};

export default Context;

// We export the CurrencyState to make it available everywhere
export const CurrencyState = () => {
  return useContext(CurrencyContext);
};
