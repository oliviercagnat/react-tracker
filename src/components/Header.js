import { AppBar, Container, createTheme, makeStyles, MenuItem, Select, ThemeProvider, Toolbar, Typography } from '@material-ui/core';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { CurrencyState } from '../context/Context';

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: 'gold',
    fontFamily: 'Montserrat',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
}));

const Header = () => {
  const MUIclasses = useStyles();

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  // lets you access the history instance used by React Router.
  // Using the history instance you can redirect users to another page.
  // The history instance created by React Router uses a Stack( called “History Stack” ),
  // that stores all the entries the user has visited.
  const history = useHistory();

  const { currency, setCurrency } = CurrencyState();

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        {/* Container helps making the app responsive */}
        <Container>
          <Toolbar>
            <Typography className={MUIclasses.title} onClick={() => history.push('/')} variant="h5">
              React Tracker
            </Typography>
            <Select variant="outlined" style={{ width: 100, height: 40, marginRight: 15 }} value={currency} onChange={(e) => setCurrency(e.target.value)}>
              <MenuItem value={'USD'}>USD</MenuItem>
              <MenuItem value={'EUR'}>EUR</MenuItem>
            </Select>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
