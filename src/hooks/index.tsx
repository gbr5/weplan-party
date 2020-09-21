import React from 'react';

import { AuthProvider } from './auth';
import { ToastProvider } from './toast';
import { ThemeModeProvider } from './theme';

const AppProvider: React.FC = ({ children }) => (
  <ThemeModeProvider>
    <AuthProvider>
      <ToastProvider>{children}</ToastProvider>
    </AuthProvider>
  </ThemeModeProvider>
);

export default AppProvider;
