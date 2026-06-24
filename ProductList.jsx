import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', cost: '$15', image: 'https://images.unsplash.com/photo-1593487568522-746db8894941?q=80&w=500' },
      { name: 'Spider Plant', cost: '$12', image: 'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?q=80&w=500' },
      { name: 'Peace Lily', cost: '$18', image: 'https://images.unsplash.com/photo-1599599810769-bcde5a160d32?q=80&w=500' },
      { name: 'Boston Fern', cost: '$14', image: 'https://images.unsplash.com/photo-1512428813824-f713c2411af5?q=80&w=500' },
      { name: 'Aloe Vera', cost: '$10', image: 'https://images.unsplash.com/photo-1596547609652-9cf5d8d76921?q=80&w=500' },
      { name: 'English Ivy', cost: '$16', image: 'https://images.unsplash.com/photo-1581442111101-7fa86b245041?q=80&w=500' }
    ]
  },
  {
    category: 'Aromatic & Fragrant Plants',
    plants: [
      { name: 'Lavender', cost: '$20', image: 'https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=500' },
      { name: 'Jasmine', cost: '$22', image: 'https://images.unsplash.com/photo-1508717272800-9fff97da7e8f?q=80&w=500' },
      { name: 'Rosemary', cost: '$15', image: 'https://images.unsplash.com/photo-1515516969-d4008cc6241a?q=80&w=500' },
      { name: 'Mint', cost: '$8', image: 'https://images.unsplash.com/photo-1603909223429-69bb7101f420?q=80&w=500' },
      { name: 'Eucalyptus', cost: '$24', image: 'https://images.unsplash.com/photo-1550948390-6b252830f36d?q=80&w=500' },
      { name: 'Gardenia', cost: '$26', image: 'https://images.unsplash.com/photo-1533038590840-1cde6e668a91?q=80&w=500' }
    ]
  },
  {
    category: 'Low Maintenance Succulents',
    plants: [
      { name: 'Jade Plant', cost: '$15', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=500' },
      { name: 'Echeveria', cost: '$9', image: 'https://images.unsplash.com/photo-1520412099416-6c17d3b5b5c9?q=80&w=500' },
      { name: 'Zebra Cactus', cost: '$11', image: 'https://images.unsplash.com/photo-1517058569871-3351d3b070bb?q=80&w=500' },
      { name: 'Burro’s Tail', cost: '$17', image: 'https://images.unsplash.com/photo-1544860707-c352cc599df8?q=80&w=500' },
      { name: 'String of Pearls', cost: '$19', image: 'https://images.unsplash.com/photo-1536882240095-0379873feb4e?q=80&w=500' },
      { name: 'Crown of Thorns', cost: '$14', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=500' }
    ]
  }
];

function ProductList({ currentView, setView }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  const totalCartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const isPlantInCart = (plantName) => {
    return cartItems.some(item => item.name === plantName);
  };

  return (
    <div>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '15px 30px', backgroundColor: '#2E7D32', color: 'white' }}>
        <div style={{ fontSize: '22px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setView('landing')}>Paradise Nursery</div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <span style={{ cursor: 'pointer' }} onClick={() => setView('products')}>Plants</span>
          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setView('cart')}>
            🛒 <span style={{ backgroundColor: 'orange', borderRadius: '50%', padding: '2px 8px', fontSize: '14px', marginLeft: '5px' }}>{totalCartCount}</span>
          </div>
        </div>
      </nav>

      {currentView === 'cart' ? (
        <CartItem onContinueShopping={() => setView('products')} />
      ) : (
        <div style={{ padding: '20px' }}>
          {plantsArray.map((section) => (
            <div key={section.category}>
              <h2 style={{ textAlign: 'center', margin: '30px 0 10px 0', color: '#2E7D32' }}>{section.category}</h2>
              <div className="product-grid">
                {section.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img className="product-image" src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p style={{ fontWeight: 'bold' }}>{plant.cost}</p>
                    <button 
                      className="get-started-button" 
                      style={{ backgroundColor: isPlantInCart(plant.name) ? '#9e9e9e' : '#4CAF50' }}
                      disabled={isPlantInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isPlantInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;
