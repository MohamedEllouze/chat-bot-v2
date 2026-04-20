export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

export const sanitizeMessage = (message: string): string => {
  return message.trim().replace(/[<>]/g, '');
};

export const isValidMessage = (message: string): boolean  => {
  return !!(message && typeof message === 'string' && message.length > 0 && message.length <= 1000);
};
