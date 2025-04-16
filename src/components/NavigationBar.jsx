import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#FFFFFF',
  boxShadow: 'none',
  borderBottom: '1px solid #D4AF37',
}));

const StyledButton = styled(Button)(({ theme }) => ({
  color: '#D4AF37',
  marginLeft: theme.spacing(2),
  '&:hover': {
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
  },
}));

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <StyledAppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ 
            flexGrow: 1, 
            cursor: 'pointer',
            color: '#D4AF37',
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700
          }}
          onClick={() => navigate('/')}
        >
          Woolley Cutzz
        </Typography>
        <Box>
          <StyledButton onClick={() => navigate('/stylist/1')}>
            Boka
          </StyledButton>
          <StyledButton onClick={() => navigate('/customer-dashboard')}>
            Kund Login
          </StyledButton>
          <StyledButton onClick={() => navigate('/admin/login')}>
            Admin Login
          </StyledButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default NavigationBar; 