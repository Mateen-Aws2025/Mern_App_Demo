import { useNavigate } from "react-router-dom";
import '../styles/Navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">👔</span>
          <span className="logo-text">MyShop</span>
        </div>

        <div className="navbar-content">
          {user && <span className="user-greeting">
            👤 {user.firstName}
          </span>}

          <div className="navbar-buttons">
            <button className="nav-btn" onClick={() => navigate('/products')}>
              🛍️ Products
            </button>
            <button className="nav-btn" onClick={() => navigate('/cart')}>
              🛒 Cart
            </button>
            <button className="nav-btn" onClick={() => navigate('/orders')}>
              📦 Orders
            </button>
            <button className="nav-btn logout-btn" onClick={logout}>
              🚪 Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;