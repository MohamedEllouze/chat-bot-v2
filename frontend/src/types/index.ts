export interface Message {
  id?: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp?: string | Date;
}

export interface ChatResponse {
  response: string;
}

export interface MessageHistoryResponse {
  success: boolean;
  messages: Message[];
}

export interface ChatError {
  message: string;
}
