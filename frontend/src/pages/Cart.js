import { useEffect, useState } from 'react';
import { getCart, checkout } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Cart.css';

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Product mapping to get details
  const productDetails = {
    '1': { name: 'Classic Denim Jeans', price: 1299, image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=100&h=100&fit=crop' },
    '2': { name: 'Cotton T-Shirt', price: 499, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=100&h=100&fit=crop' },
    '3': { name: 'Formal Shirt', price: 799, image: 'https://images.unsplash.com/photo-1596409027559-6e64d826fd91?w=100&h=100&fit=crop' },
    '4': { name: 'Chinos Trouser', price: 1099, image: 'https://images.unsplash.com/photo-1473829552305-e2db17149c7e?w=100&h=100&fit=crop' },
    '5': { name: 'Cozy Sweatshirt', price: 1499, image: 'https://images.unsplash.com/photo-1556821552-5ff41cf4357a?w=100&h=100&fit=crop' },
    '6': { name: 'Black Polo Shirt', price: 899, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=100&h=100&fit=crop' }
  };

  useEffect(() => {
    if (user) {
      getCart(user._id).then(res => setCart(res.data));
    }
  }, [user]);

  const handleCheckout = async () => {
    try {
      await checkout(user._id);
      alert("Order placed successfully ✅");
      setCart({ items: [] });
      navigate('/orders');
    } catch (err) {
      alert("Checkout failed ❌");
    }
  };

  const calculateTotal = () => {
    return cart.items.reduce((total, item) => {
      const details = productDetails[item.productId];
      return total + (details?.price || 0) * (item.quantity || 1);
    }, 0);
  };

  const getProductDetails = (productId) => {
    return productDetails[productId] || { name: 'Product', price: 0, image: 'https://via.placeholder.com/100' };
  };

  return (
    <div>
      <Navbar />

      <div className="cart-container">
        <div className="cart-header">
          <h1>🛒 Your Shopping Cart</h1>
          <p className="cart-subtitle">{cart.items.length} items in cart</p>
        </div>

        {cart.items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-cart-icon">🛍️</div>
            <h2>Your cart is empty</h2>
            <p>Add some products to get started!</p>
            <button className="continue-shopping-btn" onClick={() => navigate('/products')}>
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items">
              {cart.items.map((item, index) => {
                const product = getProductDetails(item.productId);
                const itemTotal = product.price * (item.quantity || 1);
                
                return (
                  <div key={index} className="cart-item">
                    <img src={product.image} alt={product.name} className="cart-item-image" />
                    
                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{product.name}</h3>
                      <div className="cart-item-meta">
                        <span className="item-quantity">Qty: <strong>{item.quantity || 1}</strong></span>
                        <span className="item-price">₹{product.price}</span>
                      </div>
                    </div>
                    
                    <div className="cart-item-total">
                      <p className="item-total">₹{itemTotal}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="cart-summary">
              <div className="summary-header">Order Summary</div>
              
              <div className="summary-details">
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping</span>
                  <span className="free-shipping">Free</span>
                </div>
                <div className="summary-row">
                  <span>Tax</span>
                  <span>₹0</span>
                </div>
                <div className="summary-divider"></div>
                <div className="summary-row total-row">
                  <span className="total-label">Total Amount</span>
                  <span className="total-amount">₹{calculateTotal()}</span>
                </div>
              </div>

              <button className="checkout-btn" onClick={handleCheckout}>
                Proceed to Checkout
              </button>

              <button className="continue-shopping" onClick={() => navigate('/products')}>
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;