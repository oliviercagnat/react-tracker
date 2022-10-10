import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CoinList } from '../config/api';
import { CurrencyState } from '../context/Context';
import {
  Container,
  createTheme,
  LinearProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  ThemeProvider,
  Typography,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const CoinsTable = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState();
  const { currency, symbol } = CurrencyState();
  const history = useHistory();

  const fetchCoins = async () => {
    setLoading(true);
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false);
  };

  // Get loaded when page mounts
  // Get loaded again everytime the currency changes
  useEffect(() => {
    fetchCoins();
  }, [currency]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  const useStyles = makeStyles({
    row: {
      backgroundColor: '#16171a',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#131111',
      },
      fontFamily: 'Montserrat',
    },
    pagination: {
      '& .MuiPaginationItem-root': {
        color: 'gold',
      },
    },
  });

  const MUIclasses = useStyles();

  const handleSearch = () => {
    return coins.filter((coin) => coin.name.toLowerCase().includes(search));
    // ||
    // coin.symbol.toLowerCase.includes(search));
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: 'Montserrat' }}>
          Cryptocurrency Prices by Market Cap
        </Typography>
        <TextField
          label="Search for a Crypto Currency"
          variant="outlined"
          style={{ marginBottom: 20, width: '100%' }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          {loading ? (
            <LinearProgress style={{ backgroundColor: 'gold' }} />
          ) : (
            <Table>
              <TableHead style={{ backgroundColor: '#EEBC1D' }}>
                <TableRow>
                  {/* We map over the table header titles, we put Coin to the left and the other ones to its right */}
                  {['Coin', 'Price', '24h Change', 'Market Cap'].map((head) => (
                    <TableCell style={{ color: 'black', fontWeight: '700', fontFamily: 'Montserrat' }} key={head} align={head === 'Coin' ? 'left' : 'right'}>
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {handleSearch().map((row) => {
                  const profit = row.price_change_percentage_24h > 0;

                  return (
                    <TableRow onClick={() => history.push(`/coins/${row.id}`)} className={MUIclasses.row} key={row.name}>
                      <TableCell component="th" scope="row" style={{ display: 'flex', gap: 15 }}></TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </Container>
    </ThemeProvider>
  );
};

export default CoinsTable;
