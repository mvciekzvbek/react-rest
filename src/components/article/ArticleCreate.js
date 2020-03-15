import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as articleActions from '../../redux/actions/articleActions';
import * as categoryActions from '../../redux/actions/categoryActions';
import { bindActionCreators } from 'redux';
import CategorySelect from './CategorySelect';

const useStyles = makeStyles({
  root: {
  },
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
  chips: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 2,
  },
});

const ArticleCreate = (props) => {
  const classes = useStyles();
  const [articleState, setArticleState] = useState({
    title: '',
    lead: '',
    imageUrl: '',
    body: '',
    categoriesIds: [],
  });

  const handleCreate = (e) => {
    e.preventDefault();
    props.articleActions.createArticle(articleState);
  };

  const createInputHandler = (key) => (e) => {
    setArticleState({
      ...articleState,
      [key]: e.target.value,
    });
  };

  const selectCategory = (ids) => {
    setArticleState({
      ...articleState,
      categoriesIds: ids,
    });
  };

  return (
    <Container className={classes.root} maxWidth="md">
      <div>
        <form className={classes.form} autoComplete="off">
          <FormControl className={classes.formControl}>
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
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              required
              fullWidth
              label="Lead"
              variant="outlined"
              margin="normal"
              className={classes.textField}
              onChange={createInputHandler('lead')}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <TextField
              required
              fullWidth
              label="Image"
              variant="outlined"
              margin="normal"
              className={classes.textField}
              onChange={createInputHandler('imageUrl')}
            />
          </FormControl>
          <FormControl className={classes.formControl}>
            <CategorySelect
              handleSelect={selectCategory}
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
              className={classes.textField}
              onChange={createInputHandler('body')}
            />
          </FormControl>
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
  // createArticle: PropTypes.func.isRequired,
  // with bindActionCreators
  articleActions: PropTypes.object.isRequired,
  categoryActions: PropTypes.object.isRequired,
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

const mapDispatchToProps = (dispatch) => ({
  // createArticle: (article) => dispatch(articleActions.createArticle(article)),
  // fetchCategories: () => dispatch(categoryActions.fetchCategories()),
  // or with bindActionCreators
  articleActions: bindActionCreators(articleActions, dispatch),
  categoryActions: bindActionCreators(categoryActions, dispatch),
});


export default connect(mapStateToProps, mapDispatchToProps)(ArticleCreate);
