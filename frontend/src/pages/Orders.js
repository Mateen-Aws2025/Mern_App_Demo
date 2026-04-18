import { useEffect, useState } from 'react';
import { getOrders } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import '../styles/Orders.css';

function Orders() {
  const [orders, setOrders] = useState([]);
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
      getOrders(user._id).then(res => setOrders(res.data));
    }
  }, [user]);

  const getProductDetails = (productId) => {
    return productDetails[productId] || { name: 'Product', price: 0, image: 'https://via.placeholder.com/100' };
  };

  const calculateOrderTotal = (items) => {
    return items.reduce((total, item) => {
      const details = productDetails[item.productId];
      return total + (details?.price || 0) * (item.quantity || 1);
    }, 0);
  };

  return (
    <div>
      <Navbar />

      <div className="orders-container">
        <div className="orders-header">
          <h1>📦 Your Orders</h1>
          <p className="orders-subtitle">{orders.length} order{orders.length !== 1 ? 's' : ''} completed</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <div className="empty-orders-icon">📦</div>
            <h2>No Orders Yet</h2>
            <p>You haven't placed any orders. Start shopping now!</p>
            <button className="start-shopping-btn" onClick={() => navigate('/products')}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-grid">
            {orders.map((order, index) => (
              <div className="order-card" key={order._id || index}>
                <div className="order-header">
                  <span className="order-number">Order #{index + 1}</span>
                  <span className="order-status">Completed</span>
                </div>

                <div className="order-content">
                  <div className="order-metadata">
                    <div className="order-meta-item">
                      <span className="order-meta-label">Order ID:</span>
                      <span className="order-meta-value">{order._id?.substring(0, 8) || 'N/A'}</span>
                    </div>
                    <div className="order-meta-item">
                      <span className="order-meta-label">Date:</span>
                      <span className="order-meta-value">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="order-meta-item">
                      <span className="order-meta-label">Items:</span>
                      <span className="order-meta-value">{order.items.length}</span>
                    </div>
                  </div>

                  <div className="order-items-list">
                    <div className="order-items-title">Order Items</div>
                    {order.items.map((item, itemIndex) => {
                      const product = getProductDetails(item.productId);
                      return (
                        <div key={itemIndex} className="order-item-row">
                          <span className="item-name">{product.name}</span>
                          <div className="item-qty-price">
                            <span className="item-qty">Qty: {item.quantity || 1}</span>
                            <span className="item-price">₹{product.price * (item.quantity || 1)}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="order-total">
                    <span className="order-total-label">Total:</span>
                    <span className="order-total-amount">₹{calculateOrderTotal(order.items)}</span>
                  </div>

                  <div className="order-actions">
                    <button className="reorder-btn" onClick={() => navigate('/products')}>
                      Order Again
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;