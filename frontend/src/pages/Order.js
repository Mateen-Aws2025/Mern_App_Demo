import { useEffect, useState } from 'react';
import { getOrders } from '../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getOrders(user._id).then(res => setOrders(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Orders</h2>
      {orders.map((o, idx) => (
        <div key={idx}>
          Order #{idx + 1} - Items: {o.items.length}
        </div>
      ))}
    </div>
  );
}