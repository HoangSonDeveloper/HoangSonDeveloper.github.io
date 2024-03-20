import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './pages/ProtectedRoute';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Register from './pages/Register';
import DashBoard from './pages/DashBoard';
import Process from './pages/Process';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/process" element={<Process />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
