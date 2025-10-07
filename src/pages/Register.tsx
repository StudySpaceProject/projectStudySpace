import React, { useState, useEffect } from "react";
import { Button, TextField, Typography, Container, Alert } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Register.css";

const Register: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [detectedTimezone, setDetectedTimezone] = useState("");
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      setDetectedTimezone(timezone);
      console.log("Timezone detectada:", timezone);
    } catch (error) {
      console.error("Error detectando timezone:", error);
      setDetectedTimezone("America/Bogota");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    const success = await register(name, email, password);
    if (success) {
      setSuccess("Cuenta creada exitosamente. Redirigiendo al login...");
      setTimeout(() => navigate("/topics"), 2000); // He cambiado esto para redirigir directamente a la app en lugar de a login
    } else {
      setError("Error al crear la cuenta. El email ya puede estar registrado.");
    }
  };

  return (
    <div className="register-container">
      <div className="login-form-container">
        <Typography className="welcome-message" component="h1" gutterBottom>
          Crear Cuenta
        </Typography>
        <Typography className="subtitle" gutterBottom>
          Regístrate para acceder a tu cuenta
        </Typography>

        {/* timezone */}
        {detectedTimezone && (
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2">
              <span className="text-blue-600">🌍</span>
              <div>
                <p className="text-xs font-medium text-blue-800">
                  Zona horaria detectada
                </p>
                <p className="text-xs text-blue-600">{detectedTimezone}</p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <Alert className="error-alert" severity="error">
            {error}
          </Alert>
        )}
        {success && (
          <Alert className="error-alert" severity="success">
            {success}
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            fullWidth
            label="Nombre completo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
          />
          <TextField
            fullWidth
            label="Confirmar contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            variant="outlined"
          />
          <Button type="submit" fullWidth className="MuiButton-root">
            Crear Cuenta
          </Button>
        </form>

        <Typography className="test-credentials">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            Inicia sesión
          </Link>
        </Typography>
      </div>
    </div>
  );
};

export default Register;
