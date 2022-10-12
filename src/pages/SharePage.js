import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CompanyInfo } from '../config/api';
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import ReactHtmlParser from 'react-html-parser';
import { numberWithCommas } from '../components/Banner/Caroussel';
import ShareInfo from '../components/Share/ShareInfo';

const SharePage = () => {
  const { id } = useParams();
  const [share, setShare] = useState();

  const fetchShare = async () => {
    const data = await axios.get(CompanyInfo(id));
    setShare(data.data[0]);
    console.log(data.data[0]);
  };

  useEffect(() => {
    fetchShare();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      // MUI API: Whenever screen switch to md, align center
      [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    },
    sidebar: {
      width: '30%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 25,
      borderRight: '2px solid grey',
      [theme.breakpoints.down('md')]: {
        width: '100%',
        borderRight: 'none',
      },
    },
    heading: {
      fontWeight: 'bold',
      marginBottom: 20,
      fontFamily: 'Montserrat',
    },
    description: {
      width: '100%',
      fontFamily: 'Montserrat',
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: 'justify',
    },
    marketData: {
      alignSelf: 'start',
      padding: 25,
      paddingTop: 10,
      width: '100%',
      [theme.breakpoints.down('md')]: {
        display: 'flex',
        justifyContent: 'space-around',
      },
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        alignItems: 'center',
      },
      [theme.breakpoints.down('xs')]: {
        alignItems: 'start',
      },
    },
  }));

  const MUIclasses = useStyles();

  let profit = share?.changes >= 0;

  if (!share) return <LinearProgress style={{ backgroundColor: 'gold' }} />;

  const todayDate = () => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    const fullDate = `${day}-${month}-${year}`;
    return fullDate;
  };

  return (
    <div className={MUIclasses.container}>
      <div className={MUIclasses.sidebar}>
        <img src={share?.image} alt={share?.name} height="100" style={{ marginBottom: 20 }} />
        <Typography variant="h5" className={MUIclasses.heading}>
          {share?.companyName}
        </Typography>
        <Typography variant="subtitle1" className={MUIclasses.description}>
          {ReactHtmlParser(share?.description.split('. ').splice(0, 5).join('. '))}.
        </Typography>
        <div className={MUIclasses.marketData}>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={MUIclasses.heading}>
              {todayDate()} share change:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" className={MUIclasses.heading} style={{ color: profit > 0 ? 'rgb(14, 203, 129)' : 'red' }}>
              {profit && '+'}
              {share?.changes?.toFixed(2)}%
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={MUIclasses.heading}>
              Current price:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" className={MUIclasses.heading}>
              $ {numberWithCommas(share?.price)}
            </Typography>
          </span>
          <span style={{ display: 'flex' }}>
            <Typography variant="h5" className={MUIclasses.heading}>
              Market cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography variant="h5" className={MUIclasses.heading}>
              $ {numberWithCommas(share?.mktCap.toString().slice(0, -6))}M
            </Typography>
          </span>
        </div>
      </div>
      <ShareInfo share={share} />
    </div>
  );
};
export default SharePage;
