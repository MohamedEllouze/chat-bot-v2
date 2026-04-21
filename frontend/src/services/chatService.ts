import { ChatResponse, Message, MessageHistoryResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const CHAT_API_URL = `${API_BASE_URL}/api/chat`;
const MESSAGES_API_URL = `${API_BASE_URL}/api/messages`;

export const sendMessage = async (message: string): Promise<string> => {
  try {
    const response = await fetch(CHAT_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message })
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data: ChatResponse = await response.json();
    return data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getMessageHistory = async (): Promise<Message[]> => {
  try {
    const response = await fetch(MESSAGES_API_URL);

    if (!response.ok) {
      throw new Error('Failed to load message history');
    }

    const data: MessageHistoryResponse = await response.json();

    return (data.messages || []).map((message) => ({
      ...message,
      timestamp: message.timestamp ? new Date(message.timestamp) : undefined
    }));
  } catch (error) {
    console.error('Error loading message history:', error);
    throw error;
  }
};
