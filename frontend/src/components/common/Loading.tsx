import React from 'react';
import { 
  Box,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';


const Loading = () => 
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

export default Loading;
