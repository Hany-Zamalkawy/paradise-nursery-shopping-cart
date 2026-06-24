import React, { useState } from 'react';
import ProductList from './ProductList';
import CartItem from './CartItem';
import './App.css';

function App() {
  const [view, setView] = useState('landing'); // views: 'landing', 'products', 'cart'

  const handleGetStarted = () => {
    setView('products');
  };

  return (
    <div className="App">
      {view === 'landing' && (
        <div className="landing-page">
          <div className="landing-content">
            <h1>Paradise Nursery</h1>
            <p>Welcome to your ultimate green escape. Explore our beautifully curated collection of unique houseplants to revitalize your home or office space.</p>
            <button className="get-started-button" onClick={handleGetStarted}>
              Get Started
            </button>
          </div>
        </div>
      )}

      {view !== 'landing' && (
        <ProductList currentView={view} setView={setView} />
      )}
    </div>
  );
}

export default App;
