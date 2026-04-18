import { useEffect, useState } from 'react';
import { getOrders } from '../services/api';
import Navbar from '../components/Navbar';

function Orders() {
  const [orders, setOrders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user) {
      getOrders(user._id).then(res => setOrders(res.data));
    }
  }, [user]);

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>📦 Your Orders</h2>

        {orders.length === 0 ? (
          <p>No orders found</p>
        ) : (
          orders.map((order, index) => (
            <div key={index} style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "5px"
            }}>
              <p><b>Order #{index + 1}</b></p>
              <p><b>Items:</b> {order.items.length}</p>
              <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Orders;