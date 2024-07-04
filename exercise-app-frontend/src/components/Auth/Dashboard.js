import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import authService from '../../services/authService';
import shoulder from '../../assets/images/shoulder.jpg';
import elbow from '../../assets/images/elbow.jpg';
import ankle from '../../assets/images/ankle.png';
import hip from '../../assets/images/hip.jpg';
import knee from '../../assets/images/knee.jpg';
import wrist from '../../assets/images/wrist.jpg';
import hands from '../../assets/images/hands.jpg';
import toe from '../../assets/images/toe.png';
import OctopaiHealthLogo from '../../assets/images/octopai-logo.png';
import sitting from '../../assets/images/sitting.jpg';
import standing from '../../assets/images/standing.jpg';
import sleeping from '../../assets/images/sleeping.jpg';

const assessments = [
  { name: 'Shoulder', image: shoulder },
  { name: 'Elbow', image: elbow },
  { name: 'Ankle', image: ankle },
  { name: 'Hip', image: hip },
  { name: 'Knee', image: knee },
  { name: 'Wrist', image: wrist },
  { name: 'Hands', image: hands },
  { name: 'Toes', image: toe },
];

const Dashboard = () => {
  const location = useLocation();
  const username = location.state ? location.state.username : '';
  const [selectedPosition, setSelectedPosition] = useState('');
  const [isModalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleStartAssessment = (name) => {
    setSelectedPosition('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedPosition('');
    setModalOpen(false);
  };

  const handleSelectPosition = (position) => {
    setSelectedPosition(position);
  };

  const handleConfirmPosition = async () => {
    try {
      if (selectedPosition) {
        const response = await authService.savePosition(username, selectedPosition);
        console.log('Position saved successfully:', response.data);
        closeModal();
      } else {
        console.error('Please select a position');
      }
    } catch (error) {
      console.error('Failed to save position:', error);
    }
  };
  const handleChangePassword = () => {
    navigate('/change-password');
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.left}>
          <img src={OctopaiHealthLogo} alt="OctopaiHealthLogo" style={styles.logo} />
          <div style={styles.patientName}>Patient Name: {username}</div>
        </div>
        <h1 style={styles.title}>AROM Assessment</h1>
        <button style={styles.changePasswordButton} onClick={handleChangePassword}>
          Change Password
        </button>
        <button style={styles.logoutButton} onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div style={styles.grid}>
        {assessments.map((assessment) => (
          <div key={assessment.name} style={styles.card}>
            <img src={assessment.image} alt={assessment.name} style={styles.image} />
            <button
              style={styles.button}
              onClick={() => handleStartAssessment(assessment.name)}
            >
              Start Assessment
            </button>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div style={modalStyles.overlay} onClick={closeModal}>
          <div style={modalStyles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={modalStyles.title}>Select Position</h2>
            <div style={modalStyles.content}>
              <div
                style={selectedPosition === 'Standing' ? modalStyles.selectedImageContainer : modalStyles.imageContainer}
                onClick={() => handleSelectPosition('Standing')}
              >
                <img src={standing} alt="Standing" style={modalStyles.image} />
                <p>Standing</p>
              </div>
              <div
                style={selectedPosition === 'Sitting' ? modalStyles.selectedImageContainer : modalStyles.imageContainer}
                onClick={() => handleSelectPosition('Sitting')}
              >
                <img src={sitting} alt="Sitting" style={modalStyles.image} />
                <p>Sitting</p>
              </div>
              <div
                style={selectedPosition === 'Sleeping' ? modalStyles.selectedImageContainer : modalStyles.imageContainer}
                onClick={() => handleSelectPosition('Sleeping')}
              >
                <img src={sleeping} alt="Lying" style={modalStyles.image} />
                <p>Lying</p>
              </div>
            </div>
            <button style={modalStyles.button} onClick={handleConfirmPosition}>
              Confirm
            </button>
            <button style={modalStyles.button} onClick={closeModal}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '20px',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    position: 'relative',
  },
  left: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  logo: {
    width: '184px',
    height: '60px',
  },
  patientName: {
    fontSize: '18px',
  },
  title: {
    fontWeight: '700',
    fontSize: '24px',
    color: '#38bdf8',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
  },
  changePasswordButton: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    position: 'absolute',
    right: '120px',
  },
  logoutButton: {
    padding: '10px 20px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    position: 'absolute',
    right: '20px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '20px',
    justifyContent: 'center',
  },
  card: {
    width: '100%',
    padding: '10px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    textAlign: 'center',
    position: 'relative', // Ensure each card is positioned relatively for absolute children
  },
  image: {
    width: '190px',
    height: '190px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  button: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    width: '100%',
  },
};

const modalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 999, // Ensure modal is on top of everything
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '5px',
    width: '80%',
    maxWidth: '600px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  content: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  imageContainer: {
    textAlign: 'center',
    cursor: 'pointer', // Make containers clickable
  },
  selectedImageContainer: {
    textAlign: 'center',
    cursor: 'pointer',
    border: '2px solid #007bff', // Highlight selected container
  },
  image: {
    width: '150px',
    height: '150px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  button: {
    marginTop: '20px',
    padding: '10px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '3px',
    cursor: 'pointer',
    width: '100px',
    marginRight: '10px',
  },
};

export default Dashboard;
