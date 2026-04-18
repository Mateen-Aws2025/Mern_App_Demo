import { useState } from 'react';
import { login } from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(form);
      localStorage.setItem("user", JSON.stringify(res.data));
      navigate('/products');
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <br /><br />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <br /><br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}