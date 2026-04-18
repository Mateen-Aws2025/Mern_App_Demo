import { useEffect, useState } from 'react';
import { getCart, checkout } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const [cart, setCart] = useState({ items: [] });
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    getCart(user._id).then(res => setCart(res.data));
  }, []);

  const handleCheckout = async () => {
    await checkout(user._id);
    alert("Order placed");
    navigate('/orders');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Cart</h2>
      {cart.items.map((i, idx) => (
        <div key={idx}>
          Product: {i.productId} | Qty: {i.quantity}
        </div>
      ))}
      <br />
      <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}