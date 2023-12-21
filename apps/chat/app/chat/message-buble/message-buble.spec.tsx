import { render } from '@testing-library/react';

import MessageBuble from './message-buble';

describe('MessageBuble', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MessageBuble />);
    expect(baseElement).toBeTruthy();
  });
});
