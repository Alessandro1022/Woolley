import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';

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

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const loadBookings = () => {
    try {
      const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
      setBookings(storedBookings);
    } catch (err) {
      console.error('Error loading bookings:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStorageChange = (e) => {
    if (e.key === 'bookings') {
      loadBookings();
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return 'Ogiltigt datum';
      }
      return format(date, 'd MMMM yyyy', { locale: sv });
    } catch (error) {
      return 'Ogiltigt datum';
    }
  };

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
            Admin Dashboard
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3, border: '1px solid #D4AF37' }}>
                <Typography variant="h6" gutterBottom>
                  Bokningar
                </Typography>
                {loading ? (
                  <Typography>Laddar bokningar...</Typography>
                ) : bookings.length === 0 ? (
                  <Typography>Inga bokningar hittades</Typography>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Datum</TableCell>
                          <TableCell>Tid</TableCell>
                          <TableCell>Kund</TableCell>
                          <TableCell>Telefon</TableCell>
                          <TableCell>Tjänst</TableCell>
                          <TableCell>Status</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell>{formatDate(booking.date)}</TableCell>
                            <TableCell>{booking.time}</TableCell>
                            <TableCell>{booking.customerName}</TableCell>
                            <TableCell>{booking.customerPhone}</TableCell>
                            <TableCell>{booking.service}</TableCell>
                            <TableCell>{booking.status}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, border: '1px solid #D4AF37' }}>
                <Typography variant="h6" gutterBottom>
                  Kunder
                </Typography>
                <Typography variant="body1">
                  Hantera kundinformation och historik.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, border: '1px solid #D4AF37' }}>
                <Typography variant="h6" gutterBottom>
                  Schema
                </Typography>
                <Typography variant="body1">
                  Hantera och uppdatera salongens schema.
                </Typography>
              </Paper>
            </Grid>

            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, border: '1px solid #D4AF37' }}>
                <Typography variant="h6" gutterBottom>
                  Inställningar
                </Typography>
                <Typography variant="body1">
                  Hantera salongens inställningar och profil.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default AdminDashboard; 