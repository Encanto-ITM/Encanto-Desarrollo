import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
import { Box } from '@mui/material';
import dayjs from 'dayjs';

export function Calendario({ onTimeSelect }) {
  const [selectedDate, setSelectedDate] = React.useState(dayjs()); 

  const handleDateChange = (newValue) => {
    setSelectedDate(newValue); // Actualiza el estado con la nueva fecha
    if (onTimeSelect) {
        onTimeSelect(newValue); 
    }
  };

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
          value={selectedDate} 
          onChange={handleDateChange} 
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
