// src/app/calendar/page.tsx
'use client';

import { Box } from '@mui/material';
import { Header } from '@/components/ui/Header';
import { Sidebar } from '@/components/ui/Sidebar';
import { CalendarView } from '@/components/calendar/CalendarView';
import { useState } from 'react';

export default function CalendarPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        {sidebarOpen && <Sidebar />}
        <Box sx={{ flex: 1, overflow: 'auto' }}>
          <CalendarView />
        </Box>
      </Box>
    </Box>
  );
}
