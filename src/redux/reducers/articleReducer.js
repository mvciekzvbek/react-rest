import {
  SAVE_ARTICLE_BEGIN,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
  UPDATE_ARTICLE_FAILURE,
  UPDATE_ARTICLE_SUCCESS,
  FETCH_ARTICLE_BEGIN,
  FETCH_ARTICLE_SUCCESS,
  FETCH_ARTICLE_FAILURE, DELETE_ARTICLE_OPTIMISTIC,
} from '../actions/actionTypes';

import initialState from './initialState';

const articleReducer = (state = initialState.articles, action) => {
  switch (action.type) {
    case SAVE_ARTICLE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case CREATE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, action.payload.article],
      };
    case CREATE_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
    case UPDATE_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        items: state.items.map((article) => (article.id === action.payload.article.id ? action.payload.article : article)),
      };
    case UPDATE_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
    case FETCH_ARTICLE_BEGIN:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_ARTICLE_SUCCESS:
      return {
        ...state,
        loading: false,
        items: [...state.items, ...action.payload.articles],
      };
    case FETCH_ARTICLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: [],
      };
    case DELETE_ARTICLE_OPTIMISTIC:
      return {
        ...state,
        loading: false,
        error: action.payload.error,
        items: state.items.filter((article) => article.id === action.payload.id),
      };
    default:
      return state;
  }
};

export default articleReducer;
