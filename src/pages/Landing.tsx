import React, { useState } from 'react';
import { Button, Typography, Container, Box, Autocomplete, TextField, Modal, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { functionalities, Functionality } from '../data/functionalities';

export default function Landing() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState('');

  const handleOpenModal = (content: string) => {
    setModalContent(content);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setModalContent('');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, px: 2, position: 'relative' }}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundImage: 'url(https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(3px)',
          zIndex: -1,
        }}
      />
      {/* Title above search bar */}
      <Box
        sx={{
          textAlign: 'center',
          mb: 2,
          p: 2,
          border: '1px solid',
          borderColor: 'primary.light',
          borderRadius: 2,
          boxShadow: 2,
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
          position: 'relative',
          minHeight: 120,
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          sx={{
            position: 'absolute',
            top: 10,
            left: '270px',
            right: '220px',
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          Study Space
        </Typography>

        {/* Search Bar */}
        <Box sx={{ position: 'absolute', top: 10, left: 10, width: 250 }}>
          <Autocomplete
            options={functionalities}
            getOptionLabel={(option: Functionality) => option.title}
            renderOption={(props, option) => {
              const { key, ...rest } = props;
              return (
                <li
                  key={key}
                  {...rest}
                  onClick={() => {
                    handleOpenModal(option.description);
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    {option.title}
                  </Typography>
                </li>
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Como funciona"
                placeholder="Busca funcionalidades..."
                variant="outlined"
                sx={{
                  width: '100%',
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '50px',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    '& fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.dark',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <>
                      {params.InputProps.endAdornment}
                      <button
                        type="button"
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          marginLeft: 8,
                        }}
                        onClick={() => {
                          const inputValue = params.inputProps.value;
                          if (typeof inputValue === 'string') {
                            const found = functionalities.find(f => f.title.toLowerCase() === inputValue.toLowerCase());
                            if (found) {
                              handleOpenModal(found.description);
                            } else {
                              handleOpenModal('Funcionalidad no encontrada');
                            }
                          } else {
                            handleOpenModal('Entrada inválida');
                          }
                        }}
                        aria-label="Buscar funcionalidad"
                      >
                        🔍
                      </button>
                    </>
                  ),
                }}
              />
            )}
            sx={{ width: '100%' }}
          />
        </Box>

        {/* Start Studying Button */}
        <Button
          variant="contained"
          size="small"
          component={Link}
          to="/login"
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            px: 2,
            py: 1,
            fontSize: '1rem',
            borderRadius: '50px',
            backgroundColor: 'primary.main',
            '&:hover': {
              backgroundColor: 'primary.dark',
            },
          }}
        >
          Comenzar a Estudiar
        </Button>
      </Box>

      {/* Main Content */}
      <Box sx={{ textAlign: 'center' }}>
        {/* Welcome Section */}
        <Box
          sx={{
            p: 3,
            m: 2,
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 2,
            boxShadow: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'primary.main',
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            Bienvenido a StudySpace
          </Typography>
          <Typography
            variant="h6"
            color="text.secondary"
            paragraph
            sx={{
              mb: 4,
              fontSize: { xs: '1rem', md: '1.2rem' },
            }}
          >
            Tu plataforma inteligente de gestión de estudio con repaso espaciado
          </Typography>
        </Box>

        {/* Description Section */}
        <Box sx={{ mb: 6, textAlign: 'left', p: 3, m: 2, border: '1px solid', borderColor: 'grey.300', borderRadius: 2, boxShadow: 1, backgroundColor: 'rgba(255, 255, 255, 0.7)' }}>
          <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
            ¿Qué es StudySpace?
          </Typography>
          <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, mb: 2 }}>
            StudySpace es una plataforma inteligente de gestión de estudio que implementa metodologías de repaso espaciado, creación de notas inteligentes y seguimiento de progreso académico. Optimiza tus sesiones de estudio mediante algoritmos adaptativos y análisis de rendimiento personalizado.
          </Typography>
        </Box>
      </Box>

      {/* Modal for functionality description */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Paper
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: { xs: '80%', sm: 400 },
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            border: '1px solid',
            borderColor: 'grey.300',
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
            Descripción
          </Typography>
          <Typography id="modal-description" sx={{ mt: 2 }}>
            {modalContent}
          </Typography>
          <Box sx={{ mt: 4, textAlign: 'right' }}>
            <Button variant="contained" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Box>
        </Paper>
      </Modal>
    </Container>
  );
};

