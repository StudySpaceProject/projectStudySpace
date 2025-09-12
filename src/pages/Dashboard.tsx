import React from 'react';
import { Button, Typography, Container } from '@mui/material';
import { useAuth } from '../context/AuthContext';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <Container maxWidth="md" sx={{ mt: 8 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="h6">
        Bienvenido, {user?.name}
      </Typography>
      <Button variant="outlined" onClick={logout} sx={{ mt: 2 }}>
        Cerrar Sesión
      </Button>
    </Container>
  );
};

export default Dashboard;
