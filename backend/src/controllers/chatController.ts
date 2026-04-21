import { Request, Response } from 'express';
import { ChatService } from '../services/chatService';
import { MessageHistoryService } from '../services/messageHistoryService';
import { ChatResponse } from '../types/chat';

export class ChatController {
  private readonly chatService: ChatService;
  private readonly messageHistoryService: MessageHistoryService;

  constructor() {
    this.chatService = ChatService.getInstance();
    this.messageHistoryService = new MessageHistoryService();
  }

  public getChatResponse = (req: Request, res: Response): void => {
    try {
      const { message } = req.body;
      
      if (!message || typeof message !== 'string') {
        res.status(400).json({
          success: false,
          response: 'Message is required and must be a string'
        } as ChatResponse);
        return;
      }

      const response = this.chatService.processMessage(message);
      
      res.json({
        success: true,
        response
      } as ChatResponse);
    } catch (error) {
      console.error('Error in chat controller:', error);
      res.status(500).json({
        success: false,
        response: 'Internal server error'
      } as ChatResponse);
    }
  };

  public getKeywordResponses = (req: Request, res: Response): void => {
    try {
      const responses = this.chatService.getKeywordResponses();
      res.json({
        success: true,
        responses
      });
    } catch (error) {
      console.error('Error getting keyword responses:', error);
      res.status(500).json({
        success: false,
        response: 'Internal server error'
      });
    }
  };

  public getMessageHistory = async (req: Request, res: Response): Promise<void> => {
    try {
      const limitValue = Number(req.query.limit);
      const limit = Number.isFinite(limitValue) && limitValue > 0 ? Math.min(limitValue, 500) : 100;
      const messages = await this.messageHistoryService.getRecentMessages(limit);

      res.json({
        success: true,
        messages
      });
    } catch (error) {
      console.error('Error getting message history:', error);
      res.status(500).json({
        success: false,
        response: 'Internal server error'
      } as ChatResponse);
    }
  };
}
