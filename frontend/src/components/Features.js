import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTruck, faSyncAlt, faCreditCard, faHeadset } from '@fortawesome/free-solid-svg-icons';

const Features = () => {
  return (
    <section className="features-section">
      <div className="feature-item">
        <div className="icon-container">
          <FontAwesomeIcon icon={faTruck} size="2x" className="icon" />
        </div>
        <h3>Free Shipping</h3>
        <p>On all orders over $50.00</p>
      </div>
      <div className="feature-item">
        <div className="icon-container">
          <FontAwesomeIcon icon={faSyncAlt} size="2x" className="icon" />
        </div>
        <h3>Return for Free</h3>
        <p>Returns are free within 3 days</p>
      </div>
      <div className="feature-item">
        <div className="icon-container">
          <FontAwesomeIcon icon={faCreditCard} size="2x" className="icon" />
        </div>
        <h3>Secure Payment</h3>
        <p>Your payments are 100% safe</p>
      </div>
      <div className="feature-item">
        <div className="icon-container">
          <FontAwesomeIcon icon={faHeadset} size="2x" className="icon" />
        </div>
        <h3>24/7 Support</h3>
        <p>Contact us anytime</p>
      </div>
    </section>
  );
};

export default Features;
