import { render } from '@testing-library/react';

import MessageBuble from './message-buble';

describe('MessageBuble', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MessageBuble sender={'Tester'} message={'Hello'}/>);
    expect(baseElement).toBeTruthy();
  });
});
