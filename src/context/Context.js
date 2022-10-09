import React from 'react';
import { createContext } from 'react';

const CryptoContext = createContext();

const Context = ({ children }) => {
  return <CryptoContext.Provider>{children}</CryptoContext.Provider>;
};

export default Context;
