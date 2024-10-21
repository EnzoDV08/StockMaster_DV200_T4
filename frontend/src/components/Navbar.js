import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faPhone, faHeart, faUser, faSearch, faGift, faTags, faBars, faTimes, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FaCreditCard, FaHeadset, FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [specialOffersOpen, setSpecialOffersOpen] = useState(false);
  const [quickFindOpen, setQuickFindOpen] = useState(false); // State for Quick Find dropdown
  const [isSticky, setIsSticky] = useState(false);

  // Handle scroll to make the second navbar sticky and move the logo and cart icon
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 200) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-content">
          {/* Logo */}
          <div className="navbar-logo">
             <Link to="/">
              <img className="logo-img" src={require('../assets/Logo.png')} alt="XtraMarket Logo" />
              <span className="logo-text">SuperStore</span>
            </Link>
          </div>

          {/* Divider Line */}
          <div className="divider-line"></div>

          {/* Search Bar */}
          <form action="" className="search-bar">
            <input type="search" name="search" placeholder="What are you looking for?" required />
            <button className="search-btn" type="submit">
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            </button>
          </form>

          {/* Navbar Icons */}
          <div className="navbar-icons">
            <span className="navbar-item">
              <FontAwesomeIcon icon={faPhone} className="circle-icon" />
              <div className="phone-details">
                <span className="phone-text">Call Center</span>
                <span className="phone-number">073 662 4471</span>
              </div>
            </span>
            <span className="navbar-item">
              <FontAwesomeIcon icon={faShoppingCart} className="circle-icon" />
              <span className="cart-counter">0</span>
            </span>
            <div className="vertical-line"></div>
            <span className="navbar-item">
              <FontAwesomeIcon icon={faHeart} className="circle-icon" />
            </span>
           <span className="navbar-item">
           <Link to="/signin">
                <FontAwesomeIcon icon={faUser} className="circle-icon" />
              </Link>
        </span>
          </div>

          {/* Burger Menu for Mobile */}
          <FontAwesomeIcon
            icon={mobileMenuOpen ? faTimes : faBars}
            className="burger-menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </nav>

      {/* Second Navbar (Desktop Only) */}
      <nav className={`second-navbar ${isSticky ? 'sticky' : ''}`}>
        <div className="second-navbar-content">
          {/* Move Logo to Second Navbar when Sticky */}
          {isSticky && (
            <div className="navbar-logo-sticky">
              <img className="logo-img" src={require('../assets/Logo.png')} alt="XtraMarket Logo" />
            </div>
          )}
          <div className="second-navbar-items-left">
            <div className="second-navbar-item">
              <FontAwesomeIcon icon={faTags} className="icon" />
              New Products
            </div>
            <div className="second-navbar-item">
              Best Sales <span className="hot-badge">HOT</span>
            </div>
            <div
              className="second-navbar-item"
              onMouseEnter={() => setSpecialOffersOpen(true)}
              onMouseLeave={() => setSpecialOffersOpen(false)}
            >
              Special Offers
            </div>
            <div
              className="second-navbar-item quick-find"
              onMouseEnter={() => setQuickFindOpen(true)}
              onMouseLeave={() => setQuickFindOpen(false)}
            >
              Quick find <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
              {/* Quick Find Dropdown */}
              {quickFindOpen && (
                <div className="dropdown-content">
                  <div className="dropdown-card">
                    <div className="dropdown-card-title">Categories</div>
                    <ul>
                      <li>Supermarket</li>
                      <li>Fishes & Meats</li>
                      <li>Vegetables</li>
                      <li>Milks & Proteins</li>
                      <li>Cleaning Tools</li>
                      <li>Bestsellers</li>
                    </ul>
                  </div>
                  <div className="dropdown-card">
                    <div className="dropdown-card-title">Top Tags</div>
                    <ul>
                      <li>Pasta</li>
                      <li>Sauce</li>
                      <li>Cowboy</li>
                      <li>Steak</li>
                      <li>Burgers</li>
                      <li>Spray</li>
                    </ul>
                  </div>
                  <div className="dropdown-card">
                    <div className="dropdown-card-title">Quick Access</div>
                    <ul>
                      <li>About</li>
                      <li>FAQ</li>
                      <li>My Account</li>
                      <li>Orders</li>
                      <li>Downloads</li>
                      <li>Lost Password</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
            <div className="second-navbar-item">Contact</div>
          </div>

          {/* Cart Icon & Buttons in Second Navbar */}
          <div className="navbar-buttons">
            {isSticky && (
              <div className="cart-moved">
                <FontAwesomeIcon icon={faShoppingCart} className="circle-icon" />
                <span className="cart-counter">0</span>
              </div>
            )}
            <div className="daily-offers">
              <FontAwesomeIcon icon={faGift} className="icon" />
              Daily Offers
            </div>
            <div className="become-seller">
              Become a Seller
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar Dropdown (Shown when burger menu is clicked) */}
      <nav className={`mobile-navbar ${mobileMenuOpen ? 'open' : ''}`}>
        <a href="#">New Products</a>
        <a href="#">Best Sales</a>
        <a href="#">Special Offers</a>
        <a href="#">Quick find</a>
        <a href="#">Contact</a>
        <a href="#">Daily Offers</a>
      </nav>
    </>
  );
};

export default Navbar;
