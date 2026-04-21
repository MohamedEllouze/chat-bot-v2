import { Message } from '../types/chat';
export declare class MessageHistoryService {
    saveMessage(message: Message): Promise<void>;
    getRecentMessages(limit?: number): Promise<Message[]>;
}
//# sourceMappingURL=messageHistoryService.d.ts.map