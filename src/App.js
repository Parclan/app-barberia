import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BarbershopForm from './components/BarbershopForm';
import AdminLogin from './components/LoginAdmin/AdminLogin';

function App() {
  return (
    <Router>
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