import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Box, Typography, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  marginTop: theme.spacing(4),
  backgroundColor: '#FFFFFF',
  border: '1px solid #D4AF37',
  borderRadius: 16,
  boxShadow: 'none',
  textAlign: 'center'
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

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md">
      <StyledPaper>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom 
          sx={{ 
            color: '#D4AF37',
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700
          }}
        >
          Välkommen till Woolley Cutzz
        </Typography>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ 
            color: '#333333',
            fontFamily: 'Playfair Display, serif'
          }}
        >
          Professionell frisör med fokus på herrklippning och skäggvård
        </Typography>
        <Typography 
          variant="body1" 
          paragraph
          sx={{ 
            color: '#666666',
            fontFamily: 'Playfair Display, serif'
          }}
        >
          Erbjuder en avslappnad och professionell upplevelse i Kristinedal träningcenter.
        </Typography>
        <StyledButton
          variant="contained"
          size="large"
          onClick={() => navigate('/stylist/1')}
        >
          Boka tid
        </StyledButton>
      </StyledPaper>
    </Container>
  );
};

export default HomePage; 