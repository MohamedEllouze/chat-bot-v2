import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import ChatInterface from '.';
import useChatInterface from './useChatInterface';

jest.mock('./useChatInterface');

const mockedUseChatInterface = useChatInterface as any;

describe('ChatInterface', () => {
  const handleSendMessage = jest.fn();
  const setInputMessage = jest.fn();
  const handleKeyPress = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseChatInterface.mockReturnValue({
      messages: [
        { text: 'Bonjour', sender: 'bot' },
        { text: 'Salut', sender: 'user' },
      ],
      inputMessage: 'Hello there',
      setInputMessage,
      isLoading: false,
      error: null,
      isMobile: false,
      handleSendMessage,
      handleKeyPress,
      messagesEndRef: { current: null },
    });
  });

  it('renders the chat interface and current messages', () => {
    render(<ChatInterface />);

    expect(screen.getByText('Support Chatbot')).not.toBeNull();
    expect(screen.getByText('Bonjour')).not.toBeNull();
    expect(screen.getByText('Salut')).not.toBeNull();
    expect((screen.getByPlaceholderText('Type your message...') as HTMLInputElement).value).toBe('Hello there');
  });

  it('calls send handler when the button is clicked', () => {
    render(<ChatInterface />);

    fireEvent.click(screen.getByRole('button'));

    expect(handleSendMessage).toHaveBeenCalledTimes(1);
  });
});
