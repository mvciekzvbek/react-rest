import { createStore } from 'redux';
import rootReducer from './reducers';
import initialState from './reducers/initialState';
import * as articleActions from './actions/articleActions';

it('Should handle creating articles', () => {
  // arrange
  const store = createStore(rootReducer, initialState);
  const article = {
    title: 'A',
  };

  // act
  const action = articleActions.createArticleSuccess(article);
  store.dispatch(action);

  // assert
  const createdArticle = store.getState().articles.items[0];
  expect(createdArticle).toEqual(article);
})
