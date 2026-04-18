import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await login(form);

      // store user
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login Successful ✅");

      // redirect to products
      navigate('/products');

    } catch (err) {
      alert("Login Failed ❌");
    }
  };

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Login</h2>

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />
      <br /><br />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />
      <br /><br />

      <button onClick={handleLogin}>Login</button>

      <br /><br />

      {/* 👇 REGISTER NAVIGATION */}
      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate('/register')}
      >
        Don't have an account? Register
      </p>
    </div>
  );
}

export default Login;