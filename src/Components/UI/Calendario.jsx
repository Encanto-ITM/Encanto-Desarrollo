import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { Box } from '@mui/material';

export function Calendario() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box 
        sx={{
          width: '100%',
          height: '100%',
          margin: 1, 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: '10px',
          overflow: 'hidden', 
          bgcolor: 'background.paper', 
        }}
      >
        <StaticDateTimePicker 
          orientation="landscape" 
          sx={{
            width: '100%',
            height: '100%',
            '& .MuiStaticDateTimePicker-root': {
              width: '100%',
              height: '100%'
            }
          }} 
        />
      </Box>
    </LocalizationProvider>
  );
}
