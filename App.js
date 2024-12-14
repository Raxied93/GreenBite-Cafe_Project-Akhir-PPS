// frontend/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import OrderPage from './pages/OrderPage';
import ManageOrderPage from './pages/ManageOrderPage';
import OrderStatusPage from './pages/OrderStatusPage';
import LoginPage from './pages/LoginPage';
import ManageMenuPage from './pages/ManageMenuPage';
import Navbar from './components/Navbar';

function App() {
  const role = 'customer'; // Set role to 'customer' for this example

  return (
    <Router>
      <Navbar role={role} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/manage-order" element={<ManageOrderPage />} />
        <Route path="/order-status" element={<OrderStatusPage />} />
        <Route path="/manage-menu" element={<ManageMenuPage />} />
      </Routes>
    </Router>
  );
}

export default App;