import { useNavigate } from 'react-router-dom';
import UserForm from '../components/UserForm';

function Register() {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "50px", textAlign: "center" }}>
      <h2>Register</h2>

      <UserForm />

      <br />

      {/* 👇 BACK TO LOGIN */}
      <p
        style={{ cursor: "pointer", color: "blue" }}
        onClick={() => navigate('/')}
      >
        Already have an account? Login
      </p>
    </div>
  );
}

export default Register;