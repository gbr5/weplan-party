import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProvider from './hooks/index';

import Routes from './routes/index';

const App: React.FC = () => {
  return (
    <>
      <Router>
        <AppProvider>
          <Routes />
          <GlobalStyle />
        </AppProvider>
      </Router>
    </>
  );
};

export default App;
