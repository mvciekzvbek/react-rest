import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CategorySelect from './CategorySelect';
import FormHelperText from '@material-ui/core/FormHelperText';

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
  buttonsContainer: {
    position: 'relative',
  },
  button: {
    position: 'absolute',
    right: 0,
    backgroundColor: '#0093ff',
    '&:hover': {
      backgroundColor: '#0072c5',
    },
  },
});

const ArticleForm = ({ onChange, onSave, saving, errors }) => {
  const classes = useStyles();
  return (
    <div>
      <form className={classes.form} autoComplete="off">
        <FormControl className={classes.formControl} error={!!errors.title}>
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
            error={!!errors.title}
          />
          <FormHelperText>{errors.title}</FormHelperText>
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
        <FormControl className={classes.formControl} error={!!errors.categoriesIds}>
          <CategorySelect
            onSelect={onChange}
            errors={errors.categoriesIds}
          />
        </FormControl>
        <FormControl className={classes.formControl} error={!!errors.body}>
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
            error={!!errors.body}
          />
          <FormHelperText>{errors.body}</FormHelperText>
        </FormControl>
      </form>
      <div className={classes.buttonsContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          startIcon={<SaveIcon>Save</SaveIcon>}
          onClick={onSave}
          disabled={saving}
        >
          {saving ? 'Saving' : 'Save'}
        </Button>
      </div>
    </div>
  );
};

ArticleForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  errors: PropTypes.object,
};

export default ArticleForm;
