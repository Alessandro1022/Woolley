import React from 'react';
import { Box, Typography, Container, Paper } from '@mui/material';

const AccountPage = () => {
  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          My Account
        </Typography>
        <Paper sx={{ p: 3, mt: 2 }}>
          <Typography variant="h6" gutterBottom>
            Profile Information
          </Typography>
          <Typography variant="body1">
            Your account details will be displayed here.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default AccountPage; 