import React, { useEffect, useRef, useState } from 'react';
import Features from '../components/Features';
import '../styles/Home.css';
import { FaLaptop, FaMobileAlt, FaTshirt, FaBook, FaCouch, FaGamepad } from 'react-icons/fa';

// Import icons from react-icons
const Home = () => {
  const [activeCardIndex, setActiveCardIndex] = useState(null); // State to track the active card
  const cardsRef = useRef([]); // Create a ref for the cards

  // Intersection observer for scroll-triggered "hover" effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = cardsRef.current.indexOf(entry.target);
          if (entry.isIntersecting) {
            setActiveCardIndex(index); // Set the active card when it enters the viewport
          } else if (index === activeCardIndex) {
            setActiveCardIndex(null); // Clear the active card if it leaves the viewport
          }
        });
      },
      {
        threshold: 0.5, // Trigger when 50% of the card is in view
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card); // Observe each card
    });

    return () => {
      cardsRef.current.forEach((card) => {
        if (card) observer.unobserve(card); // Cleanup observer
      });
    };
  }, [activeCardIndex]);


  return (
    <>
      <section className="hero-section">
        <div className="hero-content">
          <h1>SuperStore</h1>
          <h2>All Products in One Place</h2>
          <p>
             Discover a wide range of products, from electronics to clothing,
            home essentials to entertainment. Your one-stop shop for everything!
          </p>
          <div className="hero-buttons">
            <button className="btn-festival">Hot Deals</button>
            <button className="btn-discover">Explore Now</button>
          </div>
        </div>
        <div className="hero-image">
          <img
            src={require('../assets/Products.png')}
            alt="Grocery Shopping"
          />
        </div>
      </section>

      <Features /> {/* Features Section stays here */}

      <section className="promotions-section">
<div className="promotions-left">
  <div
    className={`promotion-card red ${activeCardIndex === 0 ? 'in-view' : ''}`}
    style={{ backgroundImage: "url('/assets/Frame1.png')" }}
    ref={(el) => (cardsRef.current[0] = el)}
  >
    <h3>50% OFF</h3>
    <h2>Latest Smartphones</h2>
    <button className="btn-shop-now">Shop Now</button>
  </div>
    <div
      className={`promotion-card light-green ${activeCardIndex === 1 ? 'in-view' : ''}`}
      style={{ backgroundImage: "url('/assets/Frame2.png')" }}
      ref={(el) => (cardsRef.current[1] = el)}
    >
      <h3>50% OFF</h3>
      <h2>Fashion Deals</h2>
      <button className="btn-shop-now">Shop Now</button>
    </div>

    <div
      className={`promotion-card dark-blue large ${activeCardIndex === 2 ? 'in-view' : ''}`}
      style={{ backgroundImage: "url('/assets/Frame3.png')" }}
      ref={(el) => (cardsRef.current[2] = el)}
    >
      <h3>30% OFF</h3>
      <h2>Home Appliances</h2>
      <button className="btn-shop-now">Shop Now</button>
    </div>
  </div>

  <div
    className={`promotion-card green large-right ${activeCardIndex === 3 ? 'in-view' : ''}`}
    style={{ backgroundImage: "url('/assets/Frame4.png')" }}
    ref={(el) => (cardsRef.current[3] = el)}
  >
    <h3>40% OFF</h3>
    <h2>Gaming Consoles</h2>
    <button className="btn-shop-now">Shop Now</button>
  </div>
</section>

     {/* Categories Section */}
      <section className="categories-section-container">
        <div className="categories-title">
          <h2>Shop by <span className="highlight">Categories</span></h2>
        </div>
        <section className="categories-section">
          <div className="category-card">
            <FaLaptop className="category-icon" />
            <p className="category-title">Electronics</p>
          </div>
          <div className="category-card">
            <FaMobileAlt className="category-icon" />
            <p className="category-title">Mobile Phones</p>
          </div>
          <div className="category-card">
            <FaTshirt className="category-icon" />
            <p className="category-title">Clothing</p>
          </div>
          <div className="category-card">
            <FaBook className="category-icon" />
            <p className="category-title">Books</p>
          </div>
          <div className="category-card">
            <FaCouch className="category-icon" />
            <p className="category-title">Furniture</p>
          </div>
          <div className="category-card">
            <FaGamepad className="category-icon" />
            <p className="category-title">Games & Consoles</p>
          </div>
        </section>
      </section>

      
    </>
  );
};

export default Home;
