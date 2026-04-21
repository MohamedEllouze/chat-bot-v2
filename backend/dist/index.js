"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const node_http_1 = require("node:http");
const chatController_1 = require("./controllers/chatController");
const database_1 = require("./config/database");
const app = (0, express_1.default)();
const httpServer = (0, node_http_1.createServer)(app);
const PORT = process.env.PORT || 3001;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
const chatController = new chatController_1.ChatController();
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});
app.post('/api/chat', chatController.getChatResponse);
app.get('/api/chat/responses', chatController.getKeywordResponses);
app.get('/api/messages', chatController.getMessageHistory);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});
const bootstrap = async () => {
    await (0, database_1.connectDatabase)();
    httpServer.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`MongoDB Atlas connected`);
        console.log(`API endpoints available at http://localhost:${PORT}`);
    });
};
void bootstrap().catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map