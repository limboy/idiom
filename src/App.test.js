import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

it('sums numbers', () => {
  expect(1 + 2).toEqual(3);
  expect(2 + 2).toEqual(4);
});
