"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageHistoryService = void 0;
const message_1 = require("../models/message");
class MessageHistoryService {
    async saveMessage(message) {
        await message_1.MessageModel.create(message);
    }
    async getRecentMessages(limit = 100) {
        const messages = await message_1.MessageModel.find()
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
exports.MessageHistoryService = MessageHistoryService;
//# sourceMappingURL=messageHistoryService.js.map