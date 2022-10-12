import React from 'react';
import { makeStyles } from '@material-ui/core';

const SelectButton = ({ children, selected, onClick }) => {
  const useStyles = makeStyles((theme) => ({
    selectbutton: {
      border: '1px solid gold',
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: 'Montserrat',
      cursor: 'pointer',
      backgroundColor: selected ? 'gold' : '',
      color: selected ? 'black' : '',
      fontWeight: selected ? 700 : 500,
      '&:hover': {
        backgroundColor: 'gold',
        color: 'black',
      },
      width: '23%',
      marginLeft: 'auto',
      marginRight: 'auto',
      [theme.breakpoints.down('sm')]: {
        width: '28%',
        margin: 0,
      },
    },
  }));

  const MUIclasses = useStyles();

  return (
    <span className={MUIclasses.selectbutton} onClick={onClick}>
      {children}
    </span>
  );
};

export default SelectButton;
