import { useState } from 'react';
import { registerUser } from '../services/Api';
import './UserForm.css';

function UserForm() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    gender: '',
    city: '',
    profession: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    try {
      await registerUser(form);
      alert("User Registered Successfully ✅");
    } catch (err) {
      alert("Error ❌");
    }
  };

  return (
    <div className="form-container">
      <h2>User Registration</h2>

      <div className="form-grid">
        <input name="firstName" placeholder="First Name" onChange={handleChange} />
        <input name="lastName" placeholder="Last Name" onChange={handleChange} />
        <input name="email" placeholder="Email" onChange={handleChange} />
        <input name="mobile" placeholder="Mobile Number" onChange={handleChange} />

        <select name="gender" onChange={handleChange}>
          <option value="">Select Gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>

        <select name="city" onChange={handleChange}>
          <option value="">Select City</option>
          <option>Hyderabad</option>
          <option>Mumbai</option>
          <option>Bangalore</option>
        </select>

        <select name="profession" onChange={handleChange}>
          <option value="">Select Profession</option>
          <option>Developer</option>
          <option>DevOps Engineer</option>
          <option>Tester</option>
        </select>
      </div>

      <button onClick={submitHandler}>Submit</button>
    </div>
  );
}

export default UserForm;