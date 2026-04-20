import React from 'react';
import { 
  Paper, 
  Typography, 
  Box
} from '@mui/material';

interface MessageProps {
  text: string;
  sender: 'user' | 'bot';
}

const Message: React.FC<MessageProps> = ({ text, sender }) => {
  const isUser = sender === 'user';
  
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 1,
        px: 1
      }}
    >
      <Paper
        elevation={1}
        sx={{
          px: 2,
          py: 1.5,
          borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
          maxWidth: '70%',
          backgroundColor: isUser ? '#1976d2' : '#f5f5f5',
          color: isUser ? 'white' : 'text.primary'
        }}
      >
        <Typography variant="body1">{text}</Typography>
      </Paper>
    </Box>
  );
};

export default Message;
