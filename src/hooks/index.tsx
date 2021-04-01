import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ThemeModeProvider } from './theme';
import { EventProvider } from './event';

const AppProvider: React.FC = ({ children }) => (
  <ThemeModeProvider>
    <AuthProvider>
      <ToastProvider>
        <EventProvider>{children}</EventProvider>
      </ToastProvider>
    </AuthProvider>
  </ThemeModeProvider>
);

export default AppProvider;
