import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/api';
import '../index.css';

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(form);
      alert("Registered Successfully ✅");
      navigate('/');
    } catch {
      alert("Error ❌");
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>

      <input placeholder="Name" onChange={e => setForm({ ...form, firstName: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />

      <button onClick={handleRegister}>Register</button>

      <p className="link-text" onClick={() => navigate('/')}>
        Already have an account? Login
      </p>
    </div>
  );
}

export default Register;