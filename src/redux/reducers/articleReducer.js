import {
  CREATE_ARTICLE_BEGIN,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAILURE,
} from '../actions/actionTypes';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_ARTICLE_BEGIN:
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
    default:
      return state;
  }
};

export default articleReducer;
