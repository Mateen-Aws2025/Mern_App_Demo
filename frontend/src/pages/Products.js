import { useEffect, useState } from 'react';
import { getProducts, addToCart } from '../services/api';
import Navbar from '../components/Navbar';
import '../index.css';

function Products() {
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    getProducts().then(res => setProducts(res.data));
  }, []);

  const handleAdd = async (id) => {
    await addToCart({ userId: user._id, productId: id });
    alert("Added to cart ✅");
  };

  return (
    <div>
      <Navbar />

      <div className="products-container">
        <h2>Products</h2>

        <div className="products-grid">
          {products.map(p => (
            <div className="card" key={p._id}>
              <img src={p.image} alt="" />
              <h4>{p.name}</h4>
              <p>₹{p.price}</p>
              <button onClick={() => handleAdd(p._id)}>
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;