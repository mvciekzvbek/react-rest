import client from '../../utils/client';

import {
  FETCH_CATEGORIES_BEGIN,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
} from './actionTypes';

export const fetchCategoriesBegin = () => ({
  type: FETCH_CATEGORIES_BEGIN,
});

export const fetchCategoriesSuccess = (categories) => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: { categories },
});

export const fetchCategoriesFailure = (error) => ({
  type: FETCH_CATEGORIES_FAILURE,
  payload: { error },
});

export const fetchCategories = () => (dispatch) => {
  dispatch(fetchCategoriesBegin());
  return client.get('/categories')
    .then(({ data }) => {
      dispatch(fetchCategoriesSuccess(data));
      return data;
    })
    .catch((error) => dispatch(fetchCategoriesFailure(error)));
};
