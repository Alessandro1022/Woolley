import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Box, Typography, Container, TextField, Button, Paper, Grid } from '@mui/material';
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

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Här skulle du normalt göra ett API-anrop för att verifiera inloggningen
    // För demo ändamål använder vi hårdkodade värden
    if (email === 'kund@woolleycutzz.se' && password === 'kund123') {
      login({ 
        id: 2, 
        email: email, 
        role: 'customer',
        name: 'Kund'
      });
      navigate('/account');
    } else {
      setError('Felaktig e-post eller lösenord');
    }
  };

  // Kontrollera om användaren är inloggad och har rätt roll
  if (!user || user.role !== 'customer') {
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
              Kund Login
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
  }

  // Visa dashboard endast för inloggade kunder
  return (
    <Container maxWidth="lg">
      <StyledPaper>
        <Box sx={{ mt: 4, mb: 4 }}>
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
            Min Dashboard
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, border: '1px solid #D4AF37' }}>
                <Typography variant="h6" gutterBottom>
                  Mina Bokningar
                </Typography>
                <Typography variant="body1">
                  Dina kommande bokningar kommer att visas här.
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, border: '1px solid #D4AF37' }}>
                <Typography variant="h6" gutterBottom>
                  Senaste Aktivitet
                </Typography>
                <Typography variant="body1">
                  Din senaste bokningsaktivitet kommer att visas här.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default CustomerDashboard; 