import * as articleActions from './articleActions';
import * as types from './actionTypes';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import mockAxios from 'axios';

const middleware = [thunk];
const mockStore = configureMockStore(middleware);


describe('Async actions', () => {
  describe('fetchArticles thunk', () => {
    it('Should create FETCH_ARTICLE_BEGIN and FETCH_ARTICLE_SUCCESS when loading articles', () => {
      const article = {
        id: 1,
        title: 'Title',
        lead: 'Lead',
        body: 'Body',
        image_url: 'Image url',
        created_at: '123',
        modified_at: '456',
      };

      const expectedActions = [
        {
          type: types.FETCH_ARTICLE_BEGIN,
        },
        {
          type: types.FETCH_ARTICLE_SUCCESS,
          payload: {
            articles: [
              article,
            ],
          },
        },
      ];

      mockAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: [
            article,
          ],
        }));

      const store = mockStore({ articles: [] });

      return store.dispatch(articleActions.fetchArticles()).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
        expect(mockAxios.get).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('saveArticle thunk', () => {
  });
});

describe('createArticle', () => {
  it('Should create a CREATE_ARTICLE_SUCCESS action', () => {
    // arrange
    const article = {
      id: 1,
      title: 'Title',
      lead: 'Lead',
      body: 'Body',
      image_url: 'Image url',
      created_at: '123',
      modified_at: '456',
    };

    const expectedAction = {
      type: types.CREATE_ARTICLE_SUCCESS,
      payload: {
        article,
      },
    };

    // act
    const action = articleActions.createArticleSuccess(article);

    // assert
    expect(action).toEqual(expectedAction);
  });
});
