import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    left: 0,
    right: 0,
    margin: '25% auto',
    top: '50%',
    '& > svg': {
      color: '#0093ff',
    },
  },
}));


const Spinner = (props) => {
  const classes = useStyles();
  return <CircularProgress className={classes.root} />
};

export default Spinner;
