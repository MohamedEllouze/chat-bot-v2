import React, { useState, useRef, useEffect } from 'react';
import {
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { getMessageHistory, sendMessage } from '../../api/chatService';
import { Message as MessageType } from '../../types';


const useChatInterface = () => {

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let isMounted = true;

    const initializeChat = async () => {
      try {
        const history = await getMessageHistory();

        if (isMounted) {
          setMessages(
            history.length > 0
              ? history
              : [{ text: 'Welcome to the chat! How can I help you today?', sender: 'bot' }]
          );
        }
      } catch (historyError) {
        console.error('Unable to load message history:', historyError);

        if (isMounted) {
          setMessages([{ text: 'Welcome to the chat! How can I help you today?', sender: 'bot' }]);
        }
      }
    };

    void initializeChat();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const messageText = inputMessage.trim();
    const userMessage: MessageType = { 
      text: messageText, 
      sender: 'user' 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const botResponse = await sendMessage(messageText);

      setMessages(prev => [...prev, {
        text: botResponse,
        sender: 'bot'
      }]);
    } catch (sendError) {
      console.error('Unable to send message:', sendError);
      setError('Unable to send message');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return {
    messages,
    inputMessage,
    isLoading,
    error,
    handleSendMessage,
    handleKeyPress,
    setInputMessage,
    messagesEndRef,
    isMobile,
  };
};

export default useChatInterface;
