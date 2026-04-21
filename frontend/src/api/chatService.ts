import { ChatResponse, Message, MessageHistoryResponse } from '../types';
import httpClient from './httpClient';

export const sendMessage = async (message: string): Promise<string> => {
  try {
    const { data } = await httpClient.post<ChatResponse>('/api/chat', { message });
    return data.response;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

export const getMessageHistory = async (): Promise<Message[]> => {
  try {
    const { data } = await httpClient.get<MessageHistoryResponse>('/api/messages');

    return (data.messages || []).map((message) => ({
      ...message,
      timestamp: message.timestamp ? new Date(message.timestamp) : undefined
    }));
  } catch (error) {
    console.error('Error loading message history:', error);
    throw error;
  }
};
