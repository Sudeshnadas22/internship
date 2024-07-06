import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import backgroundImage from './assets/background.jpg';

const App: React.FC = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUserDetails = localStorage.getItem('userDetails');
    if (storedUserDetails) {
      const { name, phone, email } = JSON.parse(storedUserDetails);
      setName(name);
      setPhone(phone);
      setEmail(email);
    }

    if (location.state && location.state.message) {
      setMessage(location.state.message);
    }
  }, [location]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone && email) {
      localStorage.setItem('userDetails', JSON.stringify({ name, phone, email }));
      navigate('/second-page');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="sm" sx={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', p: 3, borderRadius: 2 }}>
        <Box sx={{ mt: 5 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Enter your details
          </Typography>
          {message && (
            <Typography variant="body1" color="error" sx={{ mb: 2 }}>
              {message}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
              <PersonIcon sx={{ mr: 1, my: 0.5 }} />
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
              <PhoneIcon sx={{ mr: 1, my: 0.5 }} />
              <TextField
                label="Phone number"
                variant="outlined"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 2 }}>
              <EmailIcon sx={{ mr: 1, my: 0.5 }} />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Box>
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Submit
            </Button>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default App;
