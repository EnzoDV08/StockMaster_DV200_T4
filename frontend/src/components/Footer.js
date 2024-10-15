// src/components/Footer.js

import React from 'react';
import '../components/Footer.css'; // Make sure to include the CSS styles

const Footer = () => {
  return (
    <footer className="footer-section">
      <div className="footer-subscribe-container">
        <div className="footer-subscribe">
          <h2>Subscribe to <span className="highlight">Newsletter</span></h2>
          <div className="subscribe-input">
            <input type="email" placeholder="Enter your email..." />
            <button className="subscribe-button">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-section about">
          <h3>XtraMarket</h3>
          <p>“Be who you are and say what you feel, because those who mind don’t matter, and those who matter don’t mind.”</p>
          <div className="social-icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>

        <div className="footer-section links">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms & Conditions</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Refund Policy</a></li>
            <li><a href="#">+12 534 565 896</a></li>
            <li><a href="#">info@xtramarket.com</a></li>
          </ul>
        </div>

        <div className="footer-section make-money">
          <h3>Interested in a Great Way <br /> <span className="highlight">Make Money?</span></h3>
          <p>A supermarket is a self-service shop offering a wide variety of food, beverages, and household products.</p>
          <button className="become-seller-button">Become a Seller</button>
        </div>
      </div>

      <div className="footer-bottom">
        <p>With ❤️ by XtraTheme. Copyright © 2024 Xtra Theme.</p>
        <div className="payment-methods">
          <img src="visa.png" alt="Visa" />
          <img src="mastercard.png" alt="MasterCard" />
          <img src="maestro.png" alt="Maestro" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;

