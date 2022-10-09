import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';

// We create a
const CurrencyContext = createContext();

const Context = ({ children }) => {
  const [currency, setCurrency] = useState('USD');
  const [symbol, setSymbol] = useState('$');

  // useEffect runs everytime currency changes
  // it will trigger setSymbol and change it accordingly
  useEffect(() => {
    if (currency === 'USD') setSymbol('$');
    else if (currency === 'EUR') setSymbol('€');
  }, [currency]);

  // We export the values to make them available in all our app
  return <CurrencyContext.Provider value={{ currency, setCurrency, symbol }}>{children}</CurrencyContext.Provider>;
};

export default Context;

// We export the CurrencyState to make it available everywhere
export const CurrencyState = () => {
  return useContext(CurrencyContext);
};
