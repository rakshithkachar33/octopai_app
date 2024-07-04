import React from 'react';
import { useNavigate } from 'react-router-dom';
import OctopaiHealthLogo from '../../assets/images/octopai-logo.png';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/signup');
  };

  return (
    <div style={styles.container}>
      <img src={OctopaiHealthLogo} alt="OctopaiHealthLogo" style={styles.logo} />
      <h1 style={styles.title}>Welcome to Octopai Health</h1>
      <div style={styles.buttonContainer}>
        <button style={styles.button} onClick={handleLogin}>Login</button>
        <button style={styles.button} onClick={handleSignup}>Signup</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  logo: {
    width: '184px',
    height: '60px',
    marginBottom: '20px',
  },
  title: {
    fontWeight: '700',
    fontSize: '24px',
    color: '#38bdf8',
    marginBottom: '40px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
  },
};

export default LandingPage;
