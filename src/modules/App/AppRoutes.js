import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom';

import Login from '../Login';
import UserManagement from '../UserManagement';

const AppRoutes = () => {

  return (
    // <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/usermanagement" element={<UserManagement />} />

      </Routes>
    // </BrowserRouter>
  )
}

export default AppRoutes;