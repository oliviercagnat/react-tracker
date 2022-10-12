import React, { useState } from 'react';
import { GlobalState } from '../../context/Context';
import { Container, createTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@material-ui/core';
import { makeStyles, ThemeProvider } from '@material-ui/styles';
import { Pagination } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';

const ShareTable = () => {
  const { nasdaqCompanies } = GlobalState();
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const history = useHistory();

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
    return nasdaqCompanies.filter(
      (company) => company.name.toLowerCase().includes(search.toLowerCase()) || company.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <Container style={{ textAlign: 'center' }}>
        <Typography variant="h4" style={{ margin: 18, fontFamily: 'Montserrat' }}>
          Nasdaq 100 list
        </Typography>
        <TextField
          label="Search for a Nasdaq Share"
          variant="outlined"
          style={{ marginBottom: 20, width: '100%' }}
          onChange={(e) => setSearch(e.target.value)}
        />
        <TableContainer>
          <Table>
            <TableHead style={{ backgroundColor: '#EEBC1D' }}>
              <TableRow>
                {['Symbol', 'Name', 'Sector'].map((head) => (
                  <TableCell style={{ color: 'black', fontWeight: '700', fontFamily: 'Montserrat' }} key={head} align="left">
                    {head}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {handleSearch()
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => (
                  <TableRow className={MUIclasses.row} key={row.name} onClick={() => history.push(`/shares/${row.symbol}`)}>
                    <TableCell align="left">{row.symbol}</TableCell>
                    <TableCell component="th" scope="row" style={{ display: 'flex', gap: 15 }}>
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span>{row.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span style={{ color: 'darkgrey' }}>{row.sector}</span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          style={{ padding: 20, width: '100%', display: 'flex', justifyContent: 'center' }}
          classes={{ ul: MUIclasses.pagination }}
          count={(handleSearch()?.length / 10).toFixed(0)}
          siblingCount={0}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
      </Container>
    </ThemeProvider>
  );
};

export default ShareTable;
