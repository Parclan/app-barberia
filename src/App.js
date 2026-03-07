import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sileo';
import BarbershopForm from './components/BarbershopForm';
import AdminLogin from './components/LoginAdmin/AdminLogin';

function App() {
  return (
    <Router>
      <Toaster position="top-right" theme="dark" />
      <div className="App">
        <Routes>
          <Route path="/" element={<BarbershopForm />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;