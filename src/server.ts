import { Server } from 'socket.io';
import { ChatService } from './services/chatService';
import { MessageHistoryService } from './services/messageHistoryService';
import { generateId, sanitizeMessage, isValidMessage } from './utils/helpers';
import { Message } from './types/chat';

export class SocketServer {
  private readonly io: Server;
  private readonly chatService: ChatService;
  private readonly messageHistoryService: MessageHistoryService;
  private readonly connectedUsers: Map<string, any>;

  constructor(httpServer: any) {
    this.io = new Server(httpServer, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
      }
    });
    
    this.chatService = ChatService.getInstance();
    this.messageHistoryService = new MessageHistoryService();
    this.connectedUsers = new Map();
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.io.on('connection', async (socket) => {
      console.log('User connected:', socket.id);
      
      const userId = generateId();
      const userName = `User_${Math.floor(Math.random() * 1000)}`;
      
      this.connectedUsers.set(socket.id, {
        id: userId,
        name: userName,
        socketId: socket.id
      });

      socket.emit('welcome', {
        message: 'Welcome to the chat! How can I help you today?',
        type: 'bot'
      });

      try {
        const recentMessages = await this.messageHistoryService.getRecentMessages();
        socket.emit('message_history', recentMessages);
      } catch (error) {
        console.error('Error loading message history:', error);
      }

      this.io.emit('user_list', Array.from(this.connectedUsers.values()));

      socket.on('send_message', async (data) => {
        try {
          const { message } = data;
          const sanitizedMessage = sanitizeMessage(message);
          
          if (!isValidMessage(sanitizedMessage)) {
            socket.emit('error', { message: 'Invalid message' });
            return;
          }

          const userMessage: Message = {
            id: generateId(),
            text: sanitizedMessage,
            sender: 'user',
            timestamp: new Date()
          };

          await this.messageHistoryService.saveMessage(userMessage);

          const botResponse = this.chatService.processMessage(sanitizedMessage);
          const botMessage: Message = {
            id: generateId(),
            text: botResponse,
            sender: 'bot',
            timestamp: new Date()
          };

          await this.messageHistoryService.saveMessage(botMessage);
          
          socket.emit('bot_response', {
            message: botResponse,
            type: 'bot'
          });

        } catch (error) {
          console.error('Error processing message:', error);
          socket.emit('error', { message: 'Error processing message' });
        }
      });

      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        this.connectedUsers.delete(socket.id);
        this.io.emit('user_list', Array.from(this.connectedUsers.values()));
      });

      socket.on('error', (error) => {
        console.error('Socket error:', error);
      });
    });
  }

  public getIO(): Server {
    return this.io;
  }
}
