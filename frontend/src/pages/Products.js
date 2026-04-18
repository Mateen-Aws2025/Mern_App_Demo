import { useEffect, useState } from 'react';
import { addToCart } from '../services/api';
import Navbar from '../components/Navbar';
import '../styles/Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Sample men's products with images
    const sampleProducts = [
      {
        _id: '1',
        name: 'Classic Denim Jeans',
        price: 1299,
        image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=300&h=300&fit=crop',
        category: 'Jeans',
        description: 'Comfortable and stylish denim jeans'
      },
      {
        _id: '2',
        name: 'Cotton T-Shirt',
        price: 499,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
        category: 'T-Shirt',
        description: 'Premium cotton T-shirt in multiple colors'
      },
      {
        _id: '3',
        name: 'Formal Shirt',
        price: 799,
        image: 'https://images.unsplash.com/photo-1596409027559-6e64d826fd91?w=300&h=300&fit=crop',
        category: 'Shirt',
        description: 'Elegant formal shirt for office wear'
      },
      {
        _id: '4',
        name: 'Chinos Trouser',
        price: 1099,
        image: 'https://images.unsplash.com/photo-1473829552305-e2db17149c7e?w=300&h=300&fit=crop',
        category: 'Trouser',
        description: 'Comfortable chino trousers for casual outings'
      },
      {
        _id: '5',
        name: 'Cozy Sweatshirt',
        price: 1499,
        image: 'https://images.unsplash.com/photo-1556821552-5ff41cf4357a?w=300&h=300&fit=crop',
        category: 'Sweatshirt',
        description: 'Warm and comfortable sweatshirt'
      },
      {
        _id: '6',
        name: 'Black Polo Shirt',
        price: 899,
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=300&h=300&fit=crop',
        category: 'Polo',
        description: 'Classic black polo shirt'
      }
    ];
    setProducts(sampleProducts);
  }, []);

  const handleAdd = async (productId) => {
    try {
      await addToCart({ userId: user._id, productId });
      setSelectedProducts(prev => ({
        ...prev,
        [productId]: true
      }));
      alert("Added to cart ✅");
    } catch (err) {
      console.error(err);
      alert("Failed to add to cart");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="products-container">
        <div className="products-header">
          <h1>👕 Men's Fashion Collection</h1>
          <p className="products-subtitle">Browse and add your favorite items to cart</p>
        </div>

        <div className="products-grid">
          {products.map(p => (
            <div className="product-card" key={p._id}>
              <div className="product-image-container">
                <img src={p.image} alt={p.name} className="product-image" />
                <span className="category-badge">{p.category}</span>
              </div>
              
              <div className="product-info">
                <h3 className="product-name">{p.name}</h3>
                <p className="product-description">{p.description}</p>
                
                <div className="product-footer">
                  <span className="product-price">₹{p.price}</span>
                  <button 
                    className={`add-to-cart-btn ${selectedProducts[p._id] ? 'added' : ''}`}
                    onClick={() => handleAdd(p._id)}
                  >
                    {selectedProducts[p._id] ? '✓ Added' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;