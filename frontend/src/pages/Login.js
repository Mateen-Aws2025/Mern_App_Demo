import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';
import '../index.css';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(form);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate('/products');
    } catch {
      alert("Login Failed ❌");
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />

      <button onClick={handleLogin}>Login</button>

      <p className="link-text" onClick={() => navigate('/register')}>
        Don't have an account? Register
      </p>
    </div>
  );
}

export default Login;