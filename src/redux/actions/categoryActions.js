import client from '../../utils/client';

export const FETCH_CATEGORIES_BEGIN = 'FETCH_CATEGORIES_BEGIN';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

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
