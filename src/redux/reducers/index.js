import { combineReducers } from 'redux';
import articles from './articleReducer';
import categories from './categoryReducer';
import ui from './uiReducer';

const rootReducer = combineReducers({
  articles,
  categories,
  ui,
});

export default rootReducer;
