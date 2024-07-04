import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
   const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.register(username, email, password);
      console.log('Signup successful', response.data);
      navigate('/login');
      // Redirect to login or another page after successful registration
    } catch (error) {
      console.error('Signup failed', error);
      setAlertMessage(error.response.data.error || 'Signup failed. Please try again.');
    }
  };

  return (
  <div><center><h1>SignUp</h1></center>
    <form onSubmit={handleSignup} style={{
      maxWidth: '300px',
      margin: '0 auto',
      padding: '20px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9'
    }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={{
          width: '100%',
          padding: '8px',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '3px'
        }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{
          width: '100%',
          padding: '8px',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '3px'
        }} />
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{
          width: '100%',
          padding: '8px',
          fontSize: '14px',
          border: '1px solid #ccc',
          borderRadius: '3px'
        }} />
      </div>
      <button type="submit" style={{
        display: 'block',
        width: '100%',
        padding: '10px',
        fontSize: '16px',
        color: '#fff',
        backgroundColor: '#28a745',
        border: 'none',
        borderRadius: '3px',
        cursor: 'pointer'
      }}>Signup</button>
      {alertMessage && <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{alertMessage}</div>}
    </form>
    </div>
  );
};

export default Signup;