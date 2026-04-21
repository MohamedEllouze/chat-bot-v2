"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
class ChatService {
    constructor() {
        this.keywordResponses = [
            { keywords: ['price', 'cost', 'pricing'], response: 'Our pricing starts at $9.99/month' },
            { keywords: ['hello', 'hi', 'hey', 'bonjour', 'salut'], response: 'Hello! How can I assist you today?' },
            { keywords: ['help', 'support', 'aide'], response: 'I\'m here to help. What can I do for you?' },
            { keywords: ['features', 'services', 'fonctionnalités', 'services'], response: 'We offer various features including cloud storage, real-time sync, and 24/7 support' },
            { keywords: ['bye', 'goodbye', 'au revoir', 'merci'], response: 'Thank you for chatting with us! Have a great day!' },
            { keywords: ['weather', 'temperature', 'météo'], response: 'I can help you with weather information. What specific location would you like to know about?' },
            { keywords: ['time', 'date', 'heure', 'date'], response: 'The current time is ' + new Date().toLocaleTimeString() },
        ];
    }
    static getInstance() {
        if (!ChatService.instance) {
            ChatService.instance = new ChatService();
        }
        return ChatService.instance;
    }
    processMessage(message) {
        const lowerMessage = message.toLowerCase();
        for (const pair of this.keywordResponses) {
            if (pair.keywords.some(keyword => lowerMessage.includes(keyword))) {
                return pair.response;
            }
        }
        return 'I didn\'t understand that. Can you rephrase? You can try asking about prices, features, or just say hello!';
    }
    getKeywordResponses() {
        return this.keywordResponses;
    }
}
exports.ChatService = ChatService;
//# sourceMappingURL=chatService.js.map