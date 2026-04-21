import { Request, Response } from 'express';
export declare class ChatController {
    private readonly chatService;
    private readonly messageHistoryService;
    constructor();
    getChatResponse: (req: Request, res: Response) => void;
    getKeywordResponses: (req: Request, res: Response) => void;
    getMessageHistory: (req: Request, res: Response) => Promise<void>;
}
//# sourceMappingURL=chatController.d.ts.map