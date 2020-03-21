import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import CategorySelect from './CategorySelect';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  formControl: {
    width: '100%',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
  },
  select: {
    width: '100%',
  },
  notchedOutline: {
    '&.MuiOutlinedInput-root.Mui-focused': {
      borderColor: '#0093ff!important',
    },
  },
  // buttonsContainer: {
  //   position: 'relative',
  // },
  // button: {
  //   position: 'absolute',
  //   right: 0,
  //   backgroundColor: '#0093ff',
  //   '&:hover': {
  //     backgroundColor: '#0072c5',
  //   },
  // },
});

const ArticleForm = ({ onChange }) => {
  const classes = useStyles();
  return (
    <form className={classes.form} autoComplete="off">
      <FormControl className={classes.formControl}>
        <TextField
          required
          fullWidth
          label="Title"
          variant="outlined"
          margin="normal"
          name="title"
          InputProps={{
            classes: {
              notchedOutline: classes.notchedOutline,
            },
          }}
          className={classes.textField}
          onChange={onChange}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          required
          fullWidth
          label="Lead"
          variant="outlined"
          margin="normal"
          name="lead"
          className={classes.textField}
          onChange={onChange}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          required
          fullWidth
          label="Image"
          variant="outlined"
          margin="normal"
          name="imageUrl"
          className={classes.textField}
          onChange={onChange}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <CategorySelect
          onSelect={onChange}
        />
      </FormControl>
      <FormControl className={classes.formControl}>
        <TextField
          label="Body"
          multiline
          fullWidth
          rows="8"
          variant="outlined"
          margin="normal"
          name="body"
          className={classes.textField}
          onChange={onChange}
        />
      </FormControl>
    </form>
  );
};

ArticleForm.propTypes = {
  onChange: PropTypes.func.isRequired,
};

export default ArticleForm;
