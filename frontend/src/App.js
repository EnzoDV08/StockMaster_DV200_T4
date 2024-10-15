// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Navbar from './components/Navbar';  // Import the Navbar
import Footer from './components/Footer';  // Import the Footer

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />  {/* Include Navbar at the top */}
        <Routes>
          <Route path="/" element={<Home />} />
          
        </Routes>
        <Footer />  {/* Include Footer at the bottom */}
      </div>
    </Router>
  );
}

export default App;
