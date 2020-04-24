import articleReducer from './articleReducer';
import * as actions from '../actions/articleActions';

it('should add article when passed CREATE_ARTICLE_SUCCESS', () => {
  // arrange
  const initialState = {
    articles: {
      items: [
        {
          title: 'A',
        }, {
          title: 'B',
        },
      ],
    },
  };

  const newArticle = {
    title: 'C',
  };

  const action = actions.createArticleSuccess(newArticle);

  // act
  const newState = articleReducer(initialState.articles, action);

  // assert
  expect(newState.items.length).toEqual(3);
  expect(newState.items[0].title).toEqual('A');
  expect(newState.items[1].title).toEqual('B');
  expect(newState.items[2].title).toEqual('C');
});

it('should update an article when passed UPDATE_ARTICLE_SUCCESS', () => {
  // arrange
  const initialState = {
    articles: {
      items: [
        {
          id: 1,
          title: 'A',
        }, {
          id: 2,
          title: 'B',
        }, {
          id: 3,
          title: 'C',
        },
      ],
    },
  };

  const article = {
    id: 2,
    title: 'D',
  };

  const action = actions.updateArticleSuccess(article);

  // act
  const newState = articleReducer(initialState.articles, action);
  const updatedCourse = newState.items.find((item) => item.id === article.id);
  const untouchedCourse = newState.items.find((item) => item.id === 1);

  // assert
  expect(newState.items.length).toEqual(3);
  expect(updatedCourse.title).toEqual('D');
  expect(untouchedCourse.title).toEqual('A');
});
