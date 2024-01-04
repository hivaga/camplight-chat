import { render } from '@testing-library/react';
import Chat from './page';

jest.mock('../../actions/send-new-chat-message', () => ({
  __esModule: true,
  default: jest.fn(),
}));


describe('Chat', () => {
  it.skip('should render successfully', () => {
    const { baseElement } = render(<Chat />);
    expect(baseElement).toBeTruthy();
  });
});
