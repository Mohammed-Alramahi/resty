import { fireEvent, render, screen, waitFor } from '@testing-library/react';

import Form from './';
import Results from '../results/index'
import '@testing-library/jest-dom/extend-expect';

it('event listenter should work', async () => {
  let callApi = jest.fn();
  render(<Form handleApiCall={callApi} />);
  const button = screen.getByRole('button');
  fireEvent.click(button);
  await waitFor(() => expect(callApi).toHaveBeenCalled());
});

it('Should render results', () => {
  const result = {
    "Headers": {
      "content-type": "string application/json"
    },
    "count": 2,
    "results": [
      {
        "name": "fake thing 1",
        "url": "http://fakethings.com/1"
      },
      {
        "name": "fake thing 2",
        "url": "http://fakethings.com/2"
      }
    ]
  };

  render(<Results data={result} />);

  const items = screen.getByTestId('results');

  expect(items).toHaveTextContent('fake thing 1');
  expect(items).toContainHTML(
    `<pre data-testid="results">{
  "Headers": {
    "content-type": "string application/json"
  },
  "count": 2,
  "results": [
    {
      "name": "fake thing 1",
      "url": "http://fakethings.com/1"
    },
    {
      "name": "fake thing 2",
      "url": "http://fakethings.com/2"
    }
  ]
}</pre>`
  );
  expect(items).toHaveTextContent('http://fakethings.com/1');
  expect(items).toHaveTextContent('content-type');
});