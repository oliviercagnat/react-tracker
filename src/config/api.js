// CRYPTO

export const CoinList = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=false`;

export const SingleCoin = (id) => `https://api.coingecko.com/api/v3/coins/${id}`;

export const HistoricalChart = (id, days = 365, currency) => `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${days}`;

export const TrendingCoins = (currency) =>
  `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=gecko_desc&per_page=10&page=1&sparkline=false&price_change_percentage=24h`;

// NASDAQ
const FINANCIAL_MODEL_API_KEY = process.env.REACT_APP_FINANCIAL_MODEL_API_KEY;
export const NasdaqList = () => `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${FINANCIAL_MODEL_API_KEY}`;

export const CompanyInfo = (id) => `https://financialmodelingprep.com/api/v3/profile/${id}?apikey=${FINANCIAL_MODEL_API_KEY}`;

export const CompanyHistoricalData = (id, days = 30) =>
  `https://financialmodelingprep.com/api/v3/historical-price-full/${id}?timeseries=${days}&apikey=${FINANCIAL_MODEL_API_KEY}`;
