import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { CompanyHistoricalData } from '../../config/api';
import { CircularProgress, createTheme, makeStyles, ThemeProvider } from '@material-ui/core';
import { Line } from 'react-chartjs-2';
import SelectButton from '../SelectButton';
import { stockChartDays } from '../../config/data';

const ShareInfo = ({ share }) => {
  const [historicalData, setHistoricalData] = useState([]);
  const [days, setDays] = useState(30);

  const fetchHistoricalData = async () => {
    const data = await axios.get(CompanyHistoricalData(share.symbol, days));
    setHistoricalData(data.data.historical);
    console.log(data.data.historical[0].date);
    console.log(data.data.historical[1]);
  };

  useEffect(() => {
    fetchHistoricalData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [days]);

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: '#fff',
      },
      type: 'dark',
    },
  });

  const useStyles = makeStyles((theme) => ({
    container: {
      width: '75%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25,
      padding: 40,
      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginTop: 0,
        padding: 20,
        paddingTop: 0,
      },
    },
  }));

  const MUIclasses = useStyles();

  return (
    <ThemeProvider theme={darkTheme}>
      <div className={MUIclasses.container}>
        {!historicalData ? (
          <CircularProgress style={{ color: 'gold' }} size={250} thickness={1} />
        ) : (
          <>
            <Line
              data={{
                labels: historicalData.reverse().map((share) => {
                  return share.date;
                }),
                datasets: [
                  {
                    data: historicalData.map((share) => share.adjClose),
                    label: `Price ( Past ${days} Market Days ) in $`,
                    borderColor: '#EEBC1D',
                  },
                ],
              }}
              options={{
                responsive: true,
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: 'flex',
                marginTop: 20,
                justifyContent: 'space-around',
                width: '100%',
              }}
            >
              {stockChartDays.map((day) => (
                <SelectButton key={day.value} onClick={() => setDays(day.value)} selected={day.value === days}>
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ShareInfo;
