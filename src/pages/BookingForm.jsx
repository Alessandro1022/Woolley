import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  MenuItem,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { useAuth } from '../contexts/AuthContext';

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

const services = [
  {
    id: '1',
    name: 'Herrklippning',
    price: 150,
    duration: '30 min',
    description: 'Professionell herrklippning med modern finish'
  },
  {
    id: '2',
    name: 'Herrklippning med skägg',
    price: 200,
    duration: '45 min',
    description: 'Herrklippning inklusive skäggtrimning och styling'
  }
];

const BookingForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    customerName: user?.name || '',
    customerPhone: user?.phone || '',
    service: '',
    date: location.state?.date || null,
    time: location.state?.time || null,
  });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location.state?.date || !location.state?.time) {
      navigate('/');
    }
  }, [location.state, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Validera telefonnummer
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(formData.customerPhone.replace(/\s/g, ''))) {
      setError('Vänligen ange ett giltigt telefonnummer (10 siffror)');
      return;
    }

    if (!formData.customerName.trim()) {
      setError('Vänligen ange ditt namn');
      return;
    }

    if (!formData.service) {
      setError('Vänligen välj en tjänst');
      return;
    }

    try {
      // Kontrollera om tiden redan är bokad
      const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      const isAlreadyBooked = existingBookings.some(booking => 
        booking.date === format(new Date(formData.date), 'yyyy-MM-dd') && 
        booking.time === formData.time
      );

      if (isAlreadyBooked) {
        setError('Tyvärr är denna tid redan bokad. Vänligen välj en annan tid.');
        return;
      }

      const newBooking = {
        id: Date.now().toString(),
        customerName: formData.customerName,
        customerPhone: formData.customerPhone,
        service: formData.service,
        date: format(new Date(formData.date), 'yyyy-MM-dd'),
        time: formData.time,
        status: 'Bekräftad',
        stylistId: location.state?.stylistId,
        createdAt: new Date().toISOString()
      };

      // Spara bokningen i localStorage
      const bookings = [...existingBookings, newBooking];
      localStorage.setItem('bookings', JSON.stringify(bookings));

      // Navigera till bekräftelsesidan
      navigate('/booking-confirmation', { state: { booking: newBooking } });
    } catch (error) {
      setError('Ett fel uppstod vid bokningen. Vänligen försök igen.');
    }
  };

  return (
    <Container maxWidth="sm">
      <StyledPaper>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: '#D4AF37',
            textAlign: 'center',
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700
          }}
        >
          Boka tid
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box sx={{ mb: 3, p: 2, border: '1px solid #D4AF37', borderRadius: 1 }}>
                <Typography variant="body1" sx={{ color: '#D4AF37', fontWeight: 'bold' }}>
                  Vald tid:
                </Typography>
                <Typography variant="body1">
                  {new Date(formData.date).toLocaleDateString('sv-SE')} kl. {formData.time}
                </Typography>
                <input
                  type="hidden"
                  name="date"
                  value={formData.date}
                />
                <input
                  type="hidden"
                  name="time"
                  value={formData.time}
                />
              </Box>
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Namn"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Telefonnummer"
                name="customerPhone"
                value={formData.customerPhone}
                onChange={handleChange}
                placeholder="0701234567"
              />
            </Grid>

            {!user && (
              <Grid item xs={12}>
                <Typography variant="body2" sx={{ textAlign: 'center' }}>
                  Har du redan ett konto?{' '}
                  <Button
                    color="primary"
                    onClick={() => navigate('/account')}
                    sx={{ textTransform: 'none' }}
                  >
                    Logga in
                  </Button>
                </Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                select
                label="Tjänst"
                name="service"
                value={formData.service}
                onChange={handleChange}
              >
                {services.map((service) => (
                  <MenuItem key={service.id} value={service.name}>
                    {service.name} - {service.duration} - {service.price} kr
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
              <StyledButton
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                Boka
              </StyledButton>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default BookingForm; 