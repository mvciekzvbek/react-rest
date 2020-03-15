import client from '../../utils/client';

import {
  CREATE_ARTICLE_BEGIN,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  FETCH_ARTICLE_BEGIN,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAILURE,
} from './actionTypes';

export const createArticleBegin = () => ({
  type: CREATE_ARTICLE_BEGIN,
});

export const createArticleSuccess = (article) => ({
  type: CREATE_ARTICLE_SUCCESS,
  payload: { article },
});

export const createArticleFailure = (error) => ({
  type: CREATE_ARTICLE_FAILURE,
  payload: { error },
});

export const fetchArticleBegin = () => ({
  type: FETCH_ARTICLE_BEGIN,
});

export const fetchArticleSuccess = (articles) => {
  return {
    type: FETCH_ARTICLE_SUCCESS,
    payload: { articles },
  };
};

export const fetchArticleFailure = (error) => ({
  type: FETCH_ARTICLE_FAILURE,
  payload: { error },
});

export const createArticle = (article) => (dispatch) => {
  dispatch(createArticleBegin());
  return client.post('/articles', article)
    .then(({ data }) => {
      dispatch(createArticleSuccess(data));
      return data;
    })
    .catch((error) => dispatch(createArticleFailure(error)));
};

export const fetchArticles = () => (dispatch) => {
  dispatch(fetchArticleBegin());
  return client.get('/articles')
    .then(({ data }) => {
      dispatch(fetchArticleSuccess(data));
      return data;
    })
    .catch((error) => dispatch(fetchArticleFailure(error)));
};
