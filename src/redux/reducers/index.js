import { combineReducers } from 'redux';
import articles from './articleReducer';
import categories from './categoryReducer';

const rootReducer = combineReducers({
  articles,
  categories,
});

export default rootReducer;
