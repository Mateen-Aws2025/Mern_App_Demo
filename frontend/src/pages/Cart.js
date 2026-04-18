import { useEffect, useState } from 'react';
import { getCart, checkout } from '../services/api';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      getCart(user._id).then(res => setCart(res.data));
    }
  }, []);

  const handleCheckout = async () => {
    try {
      await checkout(user._id);
      alert("Order placed successfully ✅");
      navigate('/orders');
    } catch (err) {
      alert("Checkout failed ❌");
    }
  };

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>🛒 Your Cart</h2>

        {cart.items.length === 0 ? (
          <p>No items in cart</p>
        ) : (
          cart.items.map((item, index) => (
            <div key={index} style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px"
            }}>
              <p><b>Product ID:</b> {item.productId}</p>
              <p><b>Quantity:</b> {item.quantity}</p>
            </div>
          ))
        )}

        {cart.items.length > 0 && (
          <button onClick={handleCheckout}>
            Checkout
          </button>
        )}
      </div>
    </div>
  );
}

export default Cart;