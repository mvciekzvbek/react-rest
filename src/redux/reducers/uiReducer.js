import {
  SNACKBAR_CLEAR, SNACKBAR_FAILURE,
  SNACKBAR_SUCCESS,
} from '../actions/actionTypes';

const uiReducer = (state = {}, action) => {
  switch (action.type) {
    case SNACKBAR_SUCCESS:
      return {
        ...state,
        successSnackbarOpen: true,
        successSnackbarMessage: action.message,
      };
    case SNACKBAR_FAILURE:
      return {
        ...state,
        failureSnackbarOpen: true,
        failureSnackbarMessage: action.message,
      };
    case SNACKBAR_CLEAR:
      return {
        ...state,
        successSnackbarOpen: false,
        failureSnackbarOpen: false,
        infoSnackbarOpen: false,
      };
    default:
      return state;
  }
};

export default uiReducer;
