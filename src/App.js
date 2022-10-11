import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Homepage from './pages/Homepage';
import CoinPage from './pages/CoinPage';
import { makeStyles } from '@material-ui/core/styles';

function App() {
  // MUI - 1 - We create the MUI constant
  // We create an object with all the styling
  const useStyles = makeStyles(() => ({
    App: {
      backgroundColor: '#14161a',
      color: 'white',
      minHeight: '100vh',
    },
  }));

  // MUI - 2 - We store the style in a constant
  const MUIclasses = useStyles();

  return (
    <BrowserRouter>
      {/* MUI - 3 - We apply the styling as a classname */}
      <div className={MUIclasses.App}>
        <Header />
        <Route path="/" component={Homepage} exact />
        <Route path="/coins/:id" component={CoinPage} />
      </div>
    </BrowserRouter>
  );
}

export default App;
