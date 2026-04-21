import React from 'react';
import {
  Box,
  TextField,
  Button,
  Avatar,
  Paper,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Message from '../message';
import useChatInterface from './useChatInterface';


const ChatInterface: React.FC = () => {

  const { messages, inputMessage, setInputMessage, isLoading, error, isMobile, handleSendMessage, messagesEndRef, handleKeyPress} = useChatInterface();
  return (
    <Paper
      elevation={3}
      sx={{
        height: isMobile ? 'calc(100vh - 120px)' : '600px',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        overflow: 'hidden'
      }}
    >
      <Box
        sx={{
          p: 2,
          backgroundColor: 'primary.main',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          gap: 1
        }}
      >
        <Avatar sx={{ bgcolor: 'secondary.main' }}>
          <Typography variant="body2">🤖</Typography>
        </Avatar>
        <Typography variant="h6">Support Chatbot</Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          p: 2,
          backgroundColor: 'grey.50'
        }}
      >
        {error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {error}
          </Alert>
        )}
        
        {messages.map((msg, index) => (
          <Message 
            key={index} 
            text={msg.text} 
            sender={msg.sender} 
          />
        ))}
        
        {isLoading && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-start',
              mb: 1
            }}
          >
            <Paper
              elevation={1}
              sx={{
                px: 2,
                py: 1.5,
                borderRadius: '20px 20px 20px 4px',
                backgroundColor: '#f5f5f5',
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <CircularProgress size={16} />
              <Typography variant="body2" color="text.secondary">
                Bot is typing...
              </Typography>
            </Paper>
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>
      <Box
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: 'divider',
          display: 'flex',
          gap: 1
        }}
      >
        <TextField
          fullWidth
          multiline
          maxRows={3}
          value={inputMessage}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
            setInputMessage(e.target.value)
          }
          onKeyDown={handleKeyPress}
          placeholder="Type your message..."
          disabled={isLoading}
          variant="outlined"
          size="small"
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px'
            }
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
          sx={{
            borderRadius: '20px',
            minWidth: 'auto',
            p: 1
          }}
        >
          <SendIcon />
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatInterface;
