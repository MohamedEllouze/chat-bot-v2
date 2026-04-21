import React, { useState, useRef, useEffect } from 'react';
import {
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SocketService from '../../services/socketService';
import { getMessageHistory } from '../../services/chatService';
import { Message as MessageType } from '../../types';


const useChatInterface = () => {

  const [messages, setMessages] = useState<MessageType[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const socketService = SocketService.getInstance();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const appendMessage = (message: MessageType) => {
    setMessages(previousMessages => [...previousMessages, message]);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    let isMounted = true;

    const handleWelcome = (data: any) => {
      appendMessage({
        text: data.message,
        sender: 'bot'
      });
    };

    const handleMessage = (data: any) => {
      appendMessage({
        text: data.text,
        sender: data.sender,
        timestamp: new Date(data.timestamp)
      });
    };

    const handleBotResponse = (data: any) => {
      appendMessage({
        text: data.message,
        sender: 'bot'
      });
      setIsLoading(false);
    };

    const handleError = (error: any) => {
      setError(error.message || 'An error occurred');
      setIsLoading(false);
    };

    const initializeChat = async () => {
      try {
        const history = await getMessageHistory();

        if (isMounted) {
          setMessages(history);
        }
      } catch (historyError) {
        console.error('Unable to load message history:', historyError);
      }

      socketService.connect();

      socketService.onWelcome(handleWelcome);
      socketService.onMessage(handleMessage);
      socketService.onBotResponse(handleBotResponse);
      socketService.onError(handleError);
    };

    void initializeChat();

    return () => {
      isMounted = false;
      socketService.disconnect();
    };
  }, [ socketService ]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: MessageType = { 
      text: inputMessage.trim(), 
      sender: 'user' 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    socketService.sendMessage(inputMessage.trim());
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
