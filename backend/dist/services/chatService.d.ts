import { KeywordResponse } from '../types/chat';
export declare class ChatService {
    private static instance;
    private readonly keywordResponses;
    private constructor();
    static getInstance(): ChatService;
    processMessage(message: string): string;
    getKeywordResponses(): KeywordResponse[];
}
//# sourceMappingURL=chatService.d.ts.map