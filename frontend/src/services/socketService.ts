import { io, Socket } from 'socket.io-client';

class SocketService {
  private socket: Socket | null = null;
  private static instance: SocketService;

  private constructor() {}

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  public connect(): void {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io('http://localhost:3001', {
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      console.log('Connected to server');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    this.socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }

  public sendMessage(message: string): void {
    if (this.socket) {
      this.socket.emit('send_message', { message });
    }
  }

  public onMessage(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('message', callback);
    }
  }

  public onBotResponse(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('bot_response', callback);
    }
  }

  public onWelcome(callback: (data: any) => void): void {
    if (this.socket) {
      this.socket.on('welcome', callback);
    }
  }

  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  public onError(callback: (error: { message: string }) => void): void {
    if (!this.socket) return;

    this.socket.on('error', (error: unknown) => {
      if (typeof error === 'string') {
        callback({ message: error });
        return;
      }

      if (error && typeof error === 'object' && 'message' in error) {
        callback({ message: String((error as { message: unknown }).message) });
        return;
      }

      callback({ message: 'An unexpected socket error occurred' });
    });

    this.socket.on('connect_error', (error: Error) => {
      callback({ message: error?.message || 'Connection error' });
    });
  }
}

export default SocketService;
