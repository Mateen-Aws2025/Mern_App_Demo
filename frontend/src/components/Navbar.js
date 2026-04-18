import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate('/');
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 20px",
      background: "#282c34",
      color: "white"
    }}>
      <div>
        <b>MyShop</b>
      </div>

      <div>
        {user && <span style={{ marginRight: "15px" }}>
          👤 {user.firstName}
        </span>}

        <button onClick={() => navigate('/products')}>Products</button>
        <button onClick={() => navigate('/cart')}>Cart</button>
        <button onClick={() => navigate('/orders')}>Orders</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

export default Navbar;