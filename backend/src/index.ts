import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { createServer } from 'node:http';
import { ChatController } from './controllers/chatController';
import { connectDatabase } from './config/database';

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

const chatController = new ChatController();

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/api/chat', chatController.getChatResponse);
app.get('/api/chat/responses', chatController.getKeywordResponses);
app.get('/api/messages', chatController.getMessageHistory);

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const bootstrap = async (): Promise<void> => {
  await connectDatabase();

  httpServer.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`MongoDB Atlas connected`);
    console.log(`API endpoints available at http://localhost:${PORT}`);
  });
};

void bootstrap().catch((error: unknown) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
