import { useEffect, useState } from 'react';
import { getProducts, addToCart } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Products() {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);

  const handleAdd = async (id) => {
    await addToCart({ userId: user._id, productId: id });
    alert("Added to cart");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>
      <button onClick={() => navigate('/cart')}>Go to Cart</button>
      <div style={{ display: 'flex', gap: 20 }}>
        {products.map(p => (
          <div key={p._id} style={{ border: '1px solid #ccc', padding: 10 }}>
            <img src={p.image} alt="" width="100" />
            <h4>{p.name}</h4>
            <p>₹{p.price}</p>
            <button onClick={() => handleAdd(p._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}