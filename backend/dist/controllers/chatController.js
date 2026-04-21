"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatController = void 0;
const chatService_1 = require("../services/chatService");
const messageHistoryService_1 = require("../services/messageHistoryService");
class ChatController {
    constructor() {
        this.getChatResponse = (req, res) => {
            try {
                const { message } = req.body;
                if (!message || typeof message !== 'string') {
                    res.status(400).json({
                        success: false,
                        response: 'Message is required and must be a string'
                    });
                    return;
                }
                const response = this.chatService.processMessage(message);
                res.json({
                    success: true,
                    response
                });
            }
            catch (error) {
                console.error('Error in chat controller:', error);
                res.status(500).json({
                    success: false,
                    response: 'Internal server error'
                });
            }
        };
        this.getKeywordResponses = (req, res) => {
            try {
                const responses = this.chatService.getKeywordResponses();
                res.json({
                    success: true,
                    responses
                });
            }
            catch (error) {
                console.error('Error getting keyword responses:', error);
                res.status(500).json({
                    success: false,
                    response: 'Internal server error'
                });
            }
        };
        this.getMessageHistory = async (req, res) => {
            try {
                const limitValue = Number(req.query.limit);
                const limit = Number.isFinite(limitValue) && limitValue > 0 ? Math.min(limitValue, 500) : 100;
                const messages = await this.messageHistoryService.getRecentMessages(limit);
                res.json({
                    success: true,
                    messages
                });
            }
            catch (error) {
                console.error('Error getting message history:', error);
                res.status(500).json({
                    success: false,
                    response: 'Internal server error'
                });
            }
        };
        this.chatService = chatService_1.ChatService.getInstance();
        this.messageHistoryService = new messageHistoryService_1.MessageHistoryService();
    }
}
exports.ChatController = ChatController;
//# sourceMappingURL=chatController.js.map