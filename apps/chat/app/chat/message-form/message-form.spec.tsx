import { render } from '@testing-library/react';

import MessageForm from './message-form';

jest.mock('../../../actions/send-new-chat-message', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('MessageForm', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MessageForm />);
    expect(baseElement).toBeTruthy();
  });
});
