import React from 'react';
import { cleanup, render } from '@testing-library/react';
import { ArticlesList } from './ArticlesList';

afterEach(cleanup);

const renderArticleList = (args) => {
  let defaultProps = {
    history: {},
    articleActions: {
      fetchArticles: jest.fn(),
    },
    articles: {
      items: [{
        id: 1,
        title: 'Title',
        lead: 'Lead',
        body: 'Body',
        image_url: 'Image url',
        created_at: '123',
        modified_at: '456',
      }],
    },
  };

  const props = { ...defaultProps, ...args };

  return render(<ArticlesList {...props} />);
};

it('should render article list', () => {
  const { getByText } = renderArticleList();
  expect(true).toEqual(true);
});
