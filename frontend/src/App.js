import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './page/LandingPage';
import AdminPage from './page/AdminPage';
import JobRegisterPage from './page/JobRegisterPage';
import AdminLoginPage from './page/AdminLoginPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/register" element={<JobRegisterPage />} />
        <Route path="/login" element={<AdminLoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
