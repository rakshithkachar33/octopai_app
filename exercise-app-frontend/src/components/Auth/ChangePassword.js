import React, { useState } from 'react';
import authService from '../../services/authService';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate(); // Hook to navigate to different routes

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await authService.changePassword(email, oldPassword, newPassword, confirmPassword);
      console.log('Password changed successfully', response.data);
      setAlertMessage('Password changed successfully.');
      navigate('/login'); // Navigate to the login page after successful password change
    } catch (error) {
      console.error('Password change failed', error);
      setAlertMessage(error.response.data.error || 'Password change failed. Please check your inputs and try again.');
    }
  };

  return (
    <div>
      <center><h1>Change Password</h1></center>
      <form onSubmit={handleChangePassword} style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '3px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Old Password:</label>
          <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '3px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>New Password:</label>
          <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '3px' }} />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Confirm New Password:</label>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} style={{ width: '100%', padding: '8px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '3px' }} />
        </div>
        <button type="submit" style={{ display: 'block', width: '100%', padding: '10px', fontSize: '16px', color: '#fff', backgroundColor: '#007bff', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Change Password</button>
        {alertMessage && <div style={{ marginTop: '10px', color: alertMessage.includes('successfully') ? 'green' : 'red' }}>{alertMessage}</div>}
      </form>
    </div>
  );
};

export default ChangePassword;
