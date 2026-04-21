export interface Message {
    id?: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp?: string | Date;
}
export interface KeywordResponse {
    keywords: string[];
    response: string;
}
export interface ChatResponse {
    response: string;
    success: boolean;
}
export interface MessageHistoryResponse {
    success: boolean;
    messages: Message[];
}
export interface ChatError {
    message: string;
}
//# sourceMappingURL=index.d.ts.map