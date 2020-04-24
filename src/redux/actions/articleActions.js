import client from '../../utils/client';

import {
  SAVE_ARTICLE_BEGIN,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  UPDATE_ARTICLE_SUCCESS,
  UPDATE_ARTICLE_FAILURE,
  FETCH_ARTICLE_BEGIN,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAILURE, DELETE_ARTICLE_OPTIMISTIC,
} from './actionTypes';

export const saveArticleBegin = () => ({
  type: SAVE_ARTICLE_BEGIN,
});

export const createArticleSuccess = (article) => ({
  type: CREATE_ARTICLE_SUCCESS,
  payload: { article },
});

export const createArticleFailure = (article) => ({
  type: CREATE_ARTICLE_FAILURE,
  payload: { article },
});

export const updateArticleSuccess = (article) => ({
  type: UPDATE_ARTICLE_SUCCESS,
  payload: { article },
});

export const updateArticleFailure = (article) => ({
  type: UPDATE_ARTICLE_FAILURE,
  payload: { article },
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

export const deleteArticleOptimistic = (article) => ({
  type: DELETE_ARTICLE_OPTIMISTIC,
  payload: article,
});

export const saveArticle = (article) => (dispatch) => {
  dispatch(saveArticleBegin());

  if (article.id) {
    return client.put(`/articles/${article.id}`, article)
      .then(({ data }) => {
        dispatch(updateArticleSuccess(data));
        return data;
      })
      .catch((error) => {
        dispatch(updateArticleFailure(error));
        return Promise.reject(error);
      });
  } else {
    return client.post('/articles', article)
      .then(({ data }) => {
        dispatch(createArticleSuccess(data));
        return data;
      })
      .catch((error) => {
        dispatch(createArticleFailure(error));
        return Promise.reject(error);
      });
  }
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

export const deleteArticle = (article) => (dispatch) => {
  dispatch(deleteArticleOptimistic(article));
  return client.delete(`/articles/${article.id}`);
};
