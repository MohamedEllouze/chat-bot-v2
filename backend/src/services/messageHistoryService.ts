import { MessageModel } from '../models/message';
import { Message } from '../types/chat';

export class MessageHistoryService {
  public async saveMessage(message: Message): Promise<void> {
    await MessageModel.create(message);
  }

  public async getRecentMessages(limit = 100): Promise<Message[]> {
    const messages = await MessageModel.find()
      .sort({ timestamp: 1 })
      .limit(limit)
      .lean();

    return messages.map((message) => ({
      id: message.id,
      text: message.text,
      sender: message.sender,
      timestamp: new Date(message.timestamp)
    }));
  }
}
