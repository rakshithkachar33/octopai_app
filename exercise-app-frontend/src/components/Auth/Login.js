import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  // Function to reset form fields and alert message
  const resetForm = () => {
    setUsername('');
    setPassword('');
    setAlertMessage('');
  };

  // Reset form fields and alert on component mount
  useEffect(() => {
    resetForm();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.login(username, password);
      console.log('Login successful', response.data.token);
      navigate('/dashboard', { state: { username: response.data.username } });
      resetForm(); // Reset form fields after successful login
    } catch (error) {
      console.error('Login failed', error);
      setAlertMessage('Login failed. Please check your username and password.');
    }
  };

  const handleForgotPassword = () => {
    navigate('/forgot-password');
  };

  return (
    <div>
      <center><h1>Login</h1></center>
      <form onSubmit={handleLogin} style={{
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
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} style={{
            width: '100%',
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '3px'
          }} />
        </div>
        <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between' }}>
          <button type="submit" style={{
            width: '48%',
            padding: '10px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#007bff',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}>Login</button>
          <button type="button" onClick={handleForgotPassword} style={{
            width: '48%',
            padding: '10px',
            fontSize: '16px',
            color: '#fff',
            backgroundColor: '#dc3545',
            border: 'none',
            borderRadius: '3px',
            cursor: 'pointer'
          }}>Forgot Password</button>
        </div>

        {alertMessage && <div style={{ color: 'red', marginTop: '10px', fontSize: '14px' }}>{alertMessage}</div>}
      </form>
    </div>
  );
};

export default Login;
