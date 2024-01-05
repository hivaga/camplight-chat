import { render } from '@testing-library/react';

import MessageBubble from './message-bubble';

describe('MessageBuble', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MessageBubble sender={'Tester'} message={'Hello'} allign={'left'}/>);
    expect(baseElement).toBeTruthy();
  });
});
