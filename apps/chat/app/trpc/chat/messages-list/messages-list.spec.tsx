import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {IChatMessage} from "../../../../model/mongoose/chat-message";
import MessagesList, {getAlignment} from "./messages-list";

// Fix for missin scrollTo method
HTMLDivElement.prototype.scrollTo = jest.fn();

describe('MessagesList Component', () => {
  const initialMessages: IChatMessage[] = [
    {_id: '1', sender: 'user1', message: 'Hello', time: 1},
    {_id: '2', sender: 'user2', message: 'Hi there!', time: 2}
  ];

  it('renders correctly with initial messages', () => {
    render(<MessagesList initialMessages={initialMessages}/>);
    initialMessages.forEach(msg => {
      expect(screen.getByText(msg.message)).toBeInTheDocument();
    });
  });

  it('aligns messages correctly based on sender', () => {
    const currentUser = 'user1'; // Mock current user
    render(<MessagesList initialMessages={initialMessages}/>);
    initialMessages.forEach(msg => {
      const alignemt = msg.sender === currentUser ? 'right' : 'left';
      const messageElement = screen.getByText(msg.message);
      const alignemtResult = getAlignment(msg.sender, 'user1');
      expect(alignemtResult).toBe(alignemt);
      expect(messageElement).toBeInTheDocument();
    });
  });
});
