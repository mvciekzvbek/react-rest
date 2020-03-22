import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Container } from '@material-ui/core';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as articleActions from '../../redux/actions/articleActions';
import * as categoryActions from '../../redux/actions/categoryActions';
import * as snackbarActions from '../../redux/actions/snackbarActions';
import ArticleForm from './ArticleForm';
import Spinner from '../shared/Spinner';

const initialArticle = {
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
  saveArticle,
  fetchCategories,
  showSuccessSnackbar,
  showFailureSnackbar,
  categories,
  history,
  ...props
}) => {
  const classes = useStyles();
  const [article, setArticle] = useState({
    ...props.article,
  });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (categories.items.length === 0) {
      fetchCategories();
    } else {
      setArticle({ ...props.article });
    }
  }, [props.article]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle({
      ...article,
      [name]: value,
    });
  };

  const formIsValid = () => {
    const { title, body, categoriesIds } = article;

    const errors = {};

    if (!title) errors.title = 'Title is required';
    if (!body) errors.body = 'Article body is required';
    if (!categoriesIds.length) errors.categoriesIds = 'At least one category is required';

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveArticle(article).then(() => {
      showSuccessSnackbar('Success!');
      history.push('/articles');
    }).catch(() => {
      setSaving(false);
      showFailureSnackbar('An error occurred');
    });
  };

  return (
    <Container className={classes.root} maxWidth="md">
      { categories.loading ? (
        <Spinner />
      ) : (
        <ArticleForm
          errors={errors}
          article={article}
          categories={categories}
          onChange={handleChange}
          onSave={handleSave}
          saving={saving}
        />
      )}
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
  saveArticle: PropTypes.func.isRequired,
  fetchCategories: PropTypes.func.isRequired,
  showSuccessSnackbar: PropTypes.func.isRequired,
  categories: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
  article: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export const getArticleById = (articles, id) => {
  return articles.find((article) => article.id === id) || null;
};

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const article = id && state.articles.items.length
    ? getArticleById(state.articles, id)
    : initialArticle;
  return {
    categories: state.categories,
    article,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   // createArticle: (article) => dispatch(articleActions.createArticle(article)),
//   // fetchCategories: () => dispatch(categoryActions.fetchCategories()),
//   // or with bindActionCreators
//   articleActions: bindActionCreators(articleActions, dispatch),
//   categoryActions: bindActionCreators(categoryActions, dispatch),
// };

const mapDispatchToProps = {
  saveArticle: articleActions.saveArticle,
  fetchCategories: categoryActions.fetchCategories,
  showSuccessSnackbar: snackbarActions.showSuccessSnackbar,
  showFailureSnackbar: snackbarActions.showFailureSnackbar,
};


export default connect(mapStateToProps, mapDispatchToProps)(ManageArticle);
