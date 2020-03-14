import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import { createArticle } from '../../redux/actions/articleActions';
import { fetchCategories } from '../../redux/actions/categoryActions';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {

  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
  },
  notchedOutline: {
    // borderColor: 'red',
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

const ArticleCreate = (props) => {
  const classes = useStyles();
  const { categories } = props;
  const [articleState, setArticleState] = useState({
    title: '',
    lead: '',
    imageUrl: '',
    body: '',
    categories: [],
  });

  useEffect(() => {
    props.dispatch(fetchCategories());
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    props.dispatch(createArticle(articleState));
  };

  const createInputHandler = (key) => (e) => {
    setArticleState({
      ...articleState,
      [key]: e.target.value,
    });
  };

  return (
    <Container className={classes.root} maxWidth="md">
      <div>
        <form className={classes.form} autoComplete="off">
          <TextField
            required
            fullWidth
            label="Title"
            variant="outlined"
            margin="normal"
            InputProps={{
              classes: {
                notchedOutline: classes.notchedOutline,
              },
            }}
            className={classes.textField}
            onChange={createInputHandler('title')}
          />
          <TextField
            required
            fullWidth
            label="Lead"
            variant="outlined"
            margin="normal"
            className={classes.textField}
            onChange={createInputHandler('lead')}
          />
          <TextField
            required
            fullWidth
            label="Image"
            variant="outlined"
            margin="normal"
            className={classes.textField}
            onChange={createInputHandler('imageUrl')}
          />
          <TextField
            label="Body"
            multiline
            fullWidth
            rows="8"
            variant="outlined"
            margin="normal"
            className={classes.textField}
            onChange={createInputHandler('body')}
          />
        </form>
      </div>
      <div className={classes.buttonsContainer}>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          endIcon={<Icon>send</Icon>}
          onClick={handleCreate}
        >
          Send
        </Button>
      </div>
    </Container>
  );
};

ArticleCreate.propTypes = {
  dispatch: PropTypes.func.isRequired,
  categories: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
});

export default connect(mapStateToProps)(ArticleCreate);
