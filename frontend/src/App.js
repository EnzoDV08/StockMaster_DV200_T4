import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import SignIn from './pages/SignInSignUp';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Breadcrumb from './components/Breadcrumb';

function App() {
  const location = useLocation();
  const isHomePage = location.pathname === '/'; // Check if we are on the home page

  // Determine if user is on the sign-in page or a potential "My Account" page
  const isSignedIn = location.pathname === '/signin'; // Placeholder for now, update with actual auth state
  
  return (
    <div className="App">
      {/* Navbar will always be at the top */}
      <Navbar />
      
      {/* Breadcrumbs will only show if it's not the home page */}
      {!isHomePage && <Breadcrumb isSignedIn={isSignedIn} />}
      
      {/* Routes for page navigation */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        {/* Add more routes here as needed */}
      </Routes>
      
      {/* Footer will always be at the bottom */}
      <Footer />
    </div>
  );
}

export default App;
