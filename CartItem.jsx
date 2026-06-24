import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate grand total cost for all items in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.cost.replace('$', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const handleContinueShopping = (e) => {
    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  const handleCheckoutShopping = () => {
    alert('Functionality Coming Soon');
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity === 1) {
      dispatch(removeItem(item.name));
    } else {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  // Calculate subtotal for an individual plant row
  const calculateTotalCost = (item) => {
    const price = parseFloat(item.cost.replace('$', ''));
    return (price * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: '#2E7D32', textAlign: 'center' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#777', margin: '30px 0' }}>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div className="cart-item" key={item.name}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-item-details" style={{ flex: 1, paddingLeft: '15px' }}>
                <div className="cart-item-name" style={{ fontSize: '18px', fontWeight: 'bold' }}>{item.name}</div>
                <div className="cart-item-cost" style={{ color: '#555' }}>Unit Price: {item.cost}</div>
                <div className="cart-item-quantity" style={{ margin: '10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
                  <span className="cart-item-quantity-value">{item.quantity}</span>
                  <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
                </div>
                <div className="cart-item-total" style={{ fontWeight: '600' }}>Subtotal: ${calculateTotalCost(item)}</div>
                <button className="get-started-button" style={{ backgroundColor: '#d32f2f', padding: '5px 15px', fontSize: '14px', marginTop: '10px' }} onClick={() => handleRemove(item)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
      <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <button className="get-started-button" style={{ backgroundColor: '#2E7D32' }} onClick={handleCheckoutShopping}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;
