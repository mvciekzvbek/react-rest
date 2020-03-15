import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import ArticlesListItem from './ArticlesListItem';
import * as articleActions from '../../redux/actions/articleActions';
import * as categoryActions from '../../redux/actions/categoryActions';


const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: '32px',
    paddingBottom: '32px',
  },
  root: {
    flexGrow: 1,
    position: 'relative',
  },
  gridContainer: {
    marginBottom: '32px',
  },
  gridItem: {
    height: '350px',
  },
  button: {
    color: 'white',
    position: 'absolute',
    backgroundColor: '#0093ff',
    '&:hover': {
      backgroundColor: '#0093ff',
    },
  },
  'button--left': {
    left: 0,
  },
  'button--right': {
    right: 0,
  },
}));


const ArticlesList = (props) => {
  const { articles, categories, articleActions: actions } = props;
  const classes = useStyles();
  const [url, setUrl] = useState('/articles');
  const [articlesList, setArticlesList] = useState(articles);

  useEffect(() => {
    const fetchData = async () => {
      const fetched = await actions.fetchArticles();
      setArticlesList(fetched);
    };

    if (articles.items.length === 0) {
      setTimeout(() => {
        fetchData();
      }, 0);
    }
  }, []);

  return (
    <Container className={classes.container}>
      <div className={classes.root}>
        {/* <Grid container spacing={3} className={classes.gridContainer}> */}
        {/*  {articles.hits.map(article => ( */}
        {/*    <Grid item sm={4} xs={12} key={article._id} className={classes.gridItem}> */}
        {/*      <ArticlesListItem data={article} /> */}
        {/*    </Grid> */}
        {/*  ))} */}
        {/* </Grid> */}
        {/* {articles.links.prev && ( */}
        {/*  <Button */}
        {/*    onClick={ (e) => { */}
        {/*      setUrl(articles.links.prev) } */}
        {/*    } */}
        {/*    color="primary" */}
        {/*    variant="contained" */}
        {/*    className={classNames(classes.button, classes["button--left"])} */}
        {/*  >Previous</Button> */}
        {/* )} */}
        {/* {articles.links.next && ( */}
        {/*  <Button */}
        {/*    onClick={ (e) => { */}
        {/*      setUrl(articles.links.next) */}
        {/*    }} */}
        {/*    color="primary" */}
        {/*    variant="contained" */}
        {/*    className={classNames(classes.button, classes["button--right"])} */}
        {/*  >Next</Button> */}
        {/* )} */}
      </div>
    </Container>
  );
};

ArticlesList.propTypes = {
  // createArticle: PropTypes.func.isRequired,
  // with bindActionCreators
  articleActions: PropTypes.object.isRequired,
  articles: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      lead: PropTypes.string,
      body: PropTypes.string.isRequired,
      image_url: PropTypes.string,
      created_at: PropTypes.string.isRequired,
      modified_at: PropTypes.string.isRequired,
    })).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  articles: state.articles,
  categories: state.categories,
});

const mapDispatchToProps = (dispatch) => ({
  // createArticle: (article) => dispatch(articleActions.createArticle(article)),
  // fetchCategories: () => dispatch(categoryActions.fetchCategories()),
  // or with bindActionCreators
  articleActions: bindActionCreators(articleActions, dispatch),
  // categoryActions: bindActionCreators(categoryActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ArticlesList);
