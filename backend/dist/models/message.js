"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageModel = void 0;
const mongoose_1 = require("mongoose");
const messageSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    text: {
        type: String,
        required: true,
        trim: true
    },
    sender: {
        type: String,
        required: true,
        enum: ['user', 'bot']
    },
    timestamp: {
        type: Date,
        required: true,
        default: Date.now
    }
}, {
    versionKey: false
});
exports.MessageModel = mongoose_1.models.Message || (0, mongoose_1.model)('Message', messageSchema);
//# sourceMappingURL=message.js.map