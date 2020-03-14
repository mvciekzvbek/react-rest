import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';
import Container from '@material-ui/core/Container';
import ArticlesListItem from './ArticlesListItem';
import { useAuth0 } from '../../react-auth0-spa';

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
  const classes = useStyles();
  const [url, setUrl] = useState('http://localhost:3000/api/v1/articles');
  const [articles, setArticles] = useState({ hits: [], count: 0, links: {} });
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    const fetchData = async () => {
      const token = await getTokenSilently();
      const articlesFetched = await axios(url, {
        headers: { authorization: `Bearer ${token}` },
      });

      setArticles({
        hits: articlesFetched.data.hits,
        count: articlesFetched.data.count,
        links: articlesFetched.data.links,
      });
    };
    fetchData();
  }, [url]);

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

export default ArticlesList;
