import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h2" component="h1" gutterBottom>
        Bienvenido a Study Space
      </Typography>
      <Typography variant="h5" color="text.secondary" paragraph>
       Tu plataforma de estudio 
      </Typography>
      <Button variant="contained" size="large" component={Link} to="/login">
        Comenzar
      </Button>
    </Container>
  );
};

export default Landing;
