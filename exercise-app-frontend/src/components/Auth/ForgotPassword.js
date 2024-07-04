import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate(); // Move useNavigate into the component scope

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.sendOtp(email);
      console.log('Mail ID verified', response.data);
      navigate('/change-password');
    } catch (error) {
      console.error('OTP send failed', error);
    }
  };

  return (
    <form onSubmit={handleForgetPassword} style={{ maxWidth: '300px', margin: '0 auto' }}>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            fontSize: '14px',
            border: '1px solid #ccc',
            borderRadius: '3px',
          }}
        />
      </div>
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '10px',
          fontSize: '16px',
          color: '#fff',
          backgroundColor: '#007bff',
          border: 'none',
          borderRadius: '3px',
          cursor: 'pointer',
        }}
      >
        Verify Mail ID
      </button>
    </form>
  );
};

export default ForgetPassword;
