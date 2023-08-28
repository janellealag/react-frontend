import React from 'react';

import {
  BrowserRouter
} from 'react-router-dom';

// import MainLayout from '../MainLayout';
import AccountProvider from '../Account/AccountProvider';
// import NotFoundView from './NotFoundView';
import AppRoutes from './AppRoutes';

function App() {
  return (
    <React.StrictMode>
        <BrowserRouter>
          <AccountProvider>
              <AppRoutes/>
          </AccountProvider>
        </BrowserRouter>
        
    </React.StrictMode>
  );
}

export default App;
