import { useState } from 'react';
import { register } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './UserForm.css';

function UserForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      await register(form);

      alert("User Registered Successfully ✅");

      // 👇 REDIRECT TO LOGIN
      navigate('/');

    } catch (err) {
      alert("Error ❌");
    }
  };

  return (
    <div className="form-container">
      <input
        name="firstName"
        placeholder="Name"
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        onChange={handleChange}
      />

      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
      />

      <button onClick={submitHandler}>Register</button>
    </div>
  );
}

export default UserForm;