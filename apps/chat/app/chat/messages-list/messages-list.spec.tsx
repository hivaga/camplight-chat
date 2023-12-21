import { render } from '@testing-library/react';

import MessagesList from './messages-list';

describe('MessagesList', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MessagesList />);
    expect(baseElement).toBeTruthy();
  });
});
