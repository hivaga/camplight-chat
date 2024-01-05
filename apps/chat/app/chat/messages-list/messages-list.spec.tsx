import { render } from '@testing-library/react';

import MessagesList from './messages-list';

describe('MessagesList', () => {
  it.skip('should render successfully', () => {
    const { baseElement } = render(<MessagesList initialMessages={[]}/>);
    expect(baseElement).toBeTruthy();
  });
});
