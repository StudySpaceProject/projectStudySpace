<<<<<<< HEAD
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/AuthContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import StudySections from './pages/StudySections';
=======
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Temas from "./pages/Temas";   // 👈 tu página de Temas
import StudySections from "./pages/StudySections";
import Layout from "./components/layout"; 
>>>>>>> origin/integracion

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const AppRoutes: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Landing />} />
<<<<<<< HEAD
      <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
      <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />} />
      <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/study-sections" element={isAuthenticated ? <StudySections /> : <Navigate to="/login" />} />
=======
      <Route
        path="/login"
        element={isAuthenticated ? <Navigate to="/topics" /> : <Login />}
      />
      <Route
        path="/register"
        element={isAuthenticated ? <Navigate to="/topics" /> : <Register />}
      />

      {/* Rutas privadas con Layout */}
      {isAuthenticated && (
        <Route element={<Layout />}>
          <Route path="/topics" element={<Temas />} />
          <Route path="/study-sections" element={<StudySections />} />
        </Route>
      )}

      {/* Redirigir a login si no está autenticado */}
      {!isAuthenticated && (
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
>>>>>>> origin/integracion
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <AppRoutes />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
