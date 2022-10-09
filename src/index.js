import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import Context from './context/Context';
import 'react-alice-carousel/lib/alice-carousel.css';

const root = document.getElementById('root');

render(
  <Context>
    <App />
  </Context>,
  root
);
