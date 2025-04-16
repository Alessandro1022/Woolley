import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Rating,
  Chip,
  Alert,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import sv from 'date-fns/locale/sv';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  background: 'linear-gradient(135deg, #FFFFFF 0%, #FDF6E3 100%)',
  border: '1px solid #D4AF37',
  borderRadius: 16,
  boxShadow: '0 4px 8px rgba(212, 175, 55, 0.15)',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #D4AF37 30%, #B38B2D 90%)',
  boxShadow: '0 3px 5px 2px rgba(212, 175, 55, .3)',
  color: '#FFFFFF',
  padding: '10px 24px',
  '&:hover': {
    background: 'linear-gradient(45deg, #B38B2D 30%, #D4AF37 90%)',
  },
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  background: 'linear-gradient(135deg, #FFFFFF 0%, #FDF6E3 100%)',
  border: '1px solid #D4AF37',
  borderRadius: 16,
  boxShadow: '0 4px 8px rgba(212, 175, 55, 0.15)',
}));

const StyledCardMedia = styled(CardMedia)(({ theme }) => ({
  height: 400,
  backgroundSize: 'contain',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundColor: '#FFFFFF',
  borderRadius: '16px 16px 0 0',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    height: 300,
  },
}));

const StylistDetailPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [error, setError] = useState(null);
  const [bookedTimes, setBookedTimes] = useState({});

  const stylist = {
    id: '1',
    name: 'Woolley Cutzzz',
    image: '/images/woolley-logo.jpg',
    rating: 4.9,
    reviews: 128,
    bio: 'Professionell frisör med fokus på herrklippning och skäggvård. Erbjuder en avslappnad och professionell upplevelse i Kristinedal träningcenter.',
    specialties: ['Herrklippning', 'Skäggvård'],
    experience: '5+ års erfarenhet',
    availability: {
      days: ['onsdag', 'torsdag', 'fredag', 'lördag', 'söndag'],
      hours: {
        start: '11:00',
        end: '23:00'
      }
    },
    services: [
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
    ],
    location: 'Kristinedal träningcenter'
  };

  useEffect(() => {
    const loadBookedTimes = () => {
      try {
        const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
        console.log('Laddade bokningar:', bookings);
        
        const bookedTimesMap = {};
        
        bookings.forEach(booking => {
          if (booking.date && booking.time) {
            const date = new Date(booking.date).toISOString().split('T')[0];
            if (!bookedTimesMap[date]) {
              bookedTimesMap[date] = [];
            }
            bookedTimesMap[date].push(booking.time);
          }
        });
        
        console.log('Bokade tider:', bookedTimesMap);
        setBookedTimes(bookedTimesMap);
      } catch (error) {
        console.error('Fel vid laddning av bokningar:', error);
      }
    };

    loadBookedTimes();
    window.addEventListener('storage', loadBookedTimes);
    return () => window.removeEventListener('storage', loadBookedTimes);
  }, []);

  const handleDateChange = (date) => {
    const day = date.getDay();
    const isAvailable = stylist.availability.days.includes(
      ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'][day]
    );
    
    if (!isAvailable) {
      setError('Inga tider tillgängliga denna dag');
      return;
    }
    
    setSelectedDate(date);
    setSelectedTime(null);
    setError(null);
  };

  const isTimeBooked = (time) => {
    if (!selectedDate) return false;
    
    const dateString = selectedDate.toISOString().split('T')[0];
    const bookedTimesForDate = bookedTimes[dateString] || [];
    const isBooked = bookedTimesForDate.includes(time);
    
    console.log(`Kontrollerar tid ${time} för datum ${dateString}:`, {
      bookedTimesForDate,
      isBooked
    });
    
    return isBooked;
  };

  const handleTimeSelect = (time) => {
    if (isTimeBooked(time)) {
      setError('Denna tid är redan bokad');
      return;
    }

    const [hours, minutes] = time.split(':').map(Number);
    const selectedDateTime = new Date(selectedDate);
    selectedDateTime.setHours(hours, minutes);

    const startTime = new Date(selectedDate);
    startTime.setHours(11, 0);
    
    const endTime = new Date(selectedDate);
    endTime.setHours(23, 0);

    if (selectedDateTime < startTime || selectedDateTime > endTime) {
      setError('Välj en tid mellan 11:00 och 23:00');
      return;
    }

    setSelectedTime(time);
    setError(null);
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      setError('Välj datum och tid för bokningen');
      return;
    }

    navigate('/booking', {
      state: {
        stylistId: stylist.id,
        date: selectedDate.toISOString(),
        time: selectedTime,
        stylistName: stylist.name
      }
    });
  };

  return (
    <Container maxWidth="lg">
      <StyledPaper>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <StyledCard>
              <StyledCardMedia
                image={stylist.image}
                title={stylist.name}
              />
              <CardContent>
                <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#D4AF37' }}>
                  {stylist.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Rating value={stylist.rating} precision={0.1} readOnly />
                  <Typography variant="body2" sx={{ ml: 1 }}>
                    ({stylist.reviews} recensioner)
                  </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                  {stylist.bio}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Erfarenhet:</strong> {stylist.experience}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Adress:</strong> {stylist.location}
                </Typography>
                <Typography variant="body1" paragraph>
                  <strong>Tillgänglighet:</strong> {stylist.availability.days.join(', ')} {stylist.availability.hours.start}-{stylist.availability.hours.end}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {stylist.specialties.map((specialty, index) => (
                    <Chip
                      key={index}
                      label={specialty}
                      sx={{ mr: 1, mb: 1, background: '#D4AF37', color: '#FFFFFF' }}
                    />
                  ))}
                </Box>
              </CardContent>
            </StyledCard>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#D4AF37' }}>
                Tjänster
              </Typography>
              <Grid container spacing={2}>
                {stylist.services.map((service) => (
                  <Grid item xs={12} key={service.id}>
                    <Card sx={{ background: 'linear-gradient(135deg, #FFFFFF 0%, #FDF6E3 100%)', border: '1px solid #D4AF37' }}>
                      <CardContent>
                        <Typography variant="h6" component="div">
                          {service.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {service.duration} - {service.price} kr
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {service.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>

            <Box>
              <Typography variant="h5" gutterBottom sx={{ color: '#D4AF37' }}>
                Välj datum och tid
              </Typography>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}
              <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={sv}>
                <DateCalendar
                  value={selectedDate}
                  onChange={handleDateChange}
                  minDate={new Date()}
                  sx={{
                    '& .Mui-selected': {
                      backgroundColor: '#D4AF37 !important',
                    },
                    '& .MuiPickersDay-dayWithMargin': {
                      '&:hover': {
                        backgroundColor: 'rgba(212, 175, 55, 0.1)',
                      },
                    },
                  }}
                />
              </LocalizationProvider>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Tillgängliga tider:
                </Typography>
                <Grid container spacing={1}>
                  {Array.from({ length: 12 }, (_, i) => {
                    const hour = i + 11;
                    const time = `${hour.toString().padStart(2, '0')}:00`;
                    const isBooked = isTimeBooked(time);
                    
                    return (
                      <Grid item xs={4} key={time}>
                        <Button
                          variant={selectedTime === time ? 'contained' : 'outlined'}
                          onClick={() => handleTimeSelect(time)}
                          disabled={isBooked}
                          sx={{
                            width: '100%',
                            borderColor: isBooked ? '#999' : '#D4AF37',
                            color: isBooked ? '#999' : (selectedTime === time ? '#FFFFFF' : '#D4AF37'),
                            backgroundColor: isBooked ? '#f5f5f5' : (selectedTime === time ? '#D4AF37' : 'transparent'),
                            '&:hover': {
                              borderColor: isBooked ? '#999' : '#B38B2D',
                            },
                            '&.Mui-disabled': {
                              color: '#999',
                              borderColor: '#999',
                            }
                          }}
                        >
                          {time}
                          {isBooked && ' (Bokad)'}
                        </Button>
                      </Grid>
                    );
                  })}
                </Grid>
              </Box>

              <Box sx={{ mt: 4, textAlign: 'center' }}>
                <StyledButton
                  variant="contained"
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime}
                >
                  Boka tid
                </StyledButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </StyledPaper>
    </Container>
  );
};

export default StylistDetailPage; 