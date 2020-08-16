import {
  SNACKBAR_CLEAR,
  SNACKBAR_SUCCESS,
  SNACKBAR_FAILURE,
} from './actionTypes';

export const showSuccess = (message) => {
  return {
    type: SNACKBAR_SUCCESS,
    message,
  };
};

export const showFailure = (message) => {
  return {
    type: SNACKBAR_FAILURE,
    message,
  };
};

export const clearSnackbarSuccess = () => {
  return {
    type: SNACKBAR_CLEAR,
  };
};

export const showSuccessSnackbar = (message) => (dispatch) => dispatch(showSuccess(message));

export const showFailureSnackbar = (message) => (dispatch) => dispatch(showFailure(message));

export const clearSnackbar = () => (dispatch) => dispatch(clearSnackbarSuccess());
