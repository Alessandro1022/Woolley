import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, IconButton, Alert } from '@mui/material';
import { styled } from '@mui/material/styles';
import { format } from 'date-fns';
import { sv } from 'date-fns/locale';
import DeleteIcon from '@mui/icons-material/Delete';

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

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await fetch(`${API_URL}/bookings`);
      if (!response.ok) {
        throw new Error('Kunde inte ladda bokningar');
      }
      const data = await response.json();
      setBookings(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_URL}/bookings/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Kunde inte ta bort bokningen');
      }
      setBookings(bookings.filter(booking => booking._id !== id));
    } catch (err) {
      setError(err.message);
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
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
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
                          <TableCell>Åtgärd</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking._id}>
                            <TableCell>{formatDate(booking.date)}</TableCell>
                            <TableCell>{booking.time}</TableCell>
                            <TableCell>{booking.customerName}</TableCell>
                            <TableCell>{booking.customerPhone}</TableCell>
                            <TableCell>{booking.service}</TableCell>
                            <TableCell>{booking.status}</TableCell>
                            <TableCell>
                              <IconButton 
                                onClick={() => handleDelete(booking._id)}
                                color="error"
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
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