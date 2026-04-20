export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export interface KeywordResponse {
  keywords: string[];
  response: string;
}

export interface ChatResponse {
  response: string;
  success: boolean;
}

export interface SocketUser {
  id: string;
  name: string;
  socketId: string;
}
