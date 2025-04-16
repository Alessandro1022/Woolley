import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, Typography, Container, TextField, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  backgroundColor: '#FFFFFF',
  border: '1px solid #D4AF37',
  borderRadius: 16,
  boxShadow: 'none',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: '#D4AF37',
  color: '#FFFFFF',
  padding: '10px 24px',
  marginTop: theme.spacing(3),
  '&:hover': {
    backgroundColor: '#B38B2D',
  },
}));

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Här skulle du normalt göra ett API-anrop för att verifiera inloggningen
    // För demo ändamål använder vi hårdkodade värden
    if (email === 'admin@woolleycutzz.se' && password === 'admin123') {
      login({ 
        id: 1, 
        email: email, 
        role: 'admin',
        name: 'Admin'
      });
      navigate('/admin');
    } else {
      setError('Felaktig e-post eller lösenord');
    }
  };

  return (
    <Container maxWidth="sm">
      <StyledPaper>
        <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{ 
              color: '#D4AF37',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700
            }}
          >
            Admin Login
          </Typography>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="E-post"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Lösenord"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Logga in
            </StyledButton>
          </Box>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default AdminLogin; 