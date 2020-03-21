import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as articleActions from '../../redux/actions/articleActions';
import * as categoryActions from '../../redux/actions/categoryActions';
import ArticleForm from './ArticleForm';

const initalArticle = {
  title: '',
  lead: '',
  imageUrl: '',
  body: '',
  categoriesIds: [],
};

const useStyles = makeStyles({
  root: {
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

const ManageArticle = ({
  createArticle,
  fetchCategories,
  categories,
  ...props
}) => {
  const classes = useStyles();
  const [article, setArticle] = useState({
    ...props.article,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (categories.items.length === 0) {
      fetchCategories();
    }
  }, []);

  const handleCreate = (e) => {
    e.preventDefault();
    createArticle(article);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };

  return (
    <Container className={classes.root} maxWidth="md">
      <div>
        <ArticleForm
          errors={errors}
          article={article}
          categories={categories}
          onChange={handleChange}
        />
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

// ManageArticle.propTypes = {
//   articleActions: PropTypes.object.isRequired,
//   categoryActions: PropTypes.object.isRequired,
//   categories: PropTypes.shape({
//     items: PropTypes.arrayOf(PropTypes.shape({
//       id: PropTypes.number.isRequired,
//       name: PropTypes.string.isRequired,
//     })).isRequired,
//   }).isRequired,
// };

ManageArticle.propTypes = {
  createArticle: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  categories: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  article: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.categories,
  article: initalArticle,
});

// const mapDispatchToProps = (dispatch) => {
//   // createArticle: (article) => dispatch(articleActions.createArticle(article)),
//   // fetchCategories: () => dispatch(categoryActions.fetchCategories()),
//   // or with bindActionCreators
//   articleActions: bindActionCreators(articleActions, dispatch),
//   categoryActions: bindActionCreators(categoryActions, dispatch),
// };

const mapDispatchToProps = {
  createArticle: articleActions.createArticle,
  fetchCategories: categoryActions.fetchCategories,
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageArticle);
