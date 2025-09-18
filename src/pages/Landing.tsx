import React from 'react';
import { Button, Typography, Container, TextField, InputAdornment, Box, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { Link } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const Landing: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, px: 2 }}>
      {/* Title above search bar */}
      <Box sx={{ textAlign: 'center', mb: 2 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 'bold',
            color: 'primary.main',
            fontSize: { xs: '2rem', md: '3rem' },
          }}
        >
          Study Space
        </Typography>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
        <TextField
          variant="outlined"
          placeholder="Buscar en StudySpace..."
          sx={{
            width: { xs: '100%', sm: '60%', md: '40%' },
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
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Main Layout: Left Sidebar and Right Content */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
        {/* Left Sidebar: Collapsible Functionalities */}
        <Box sx={{ flex: 1, minWidth: { md: '300px' }, minHeight: '600px', borderRadius: 2, boxShadow: 3, backgroundColor: 'grey.100', p: 2 }}>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="funcionalidades-content"
              id="funcionalidades-header"
              sx={{ backgroundColor: 'primary.light', color: 'white' }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                Funcionalidades
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ backgroundColor: 'grey.50', p: 0 }}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="repaso-content"
                  id="repaso-header"
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Repaso Espaciado
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    Algoritmos que programan automáticamente sesiones de repaso para maximizar la retención de conocimientos.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="notas-content"
                  id="notas-header"
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Notas Inteligentes
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    Crea y gestiona tarjetas de estudio con preguntas y respuestas, organizadas por temas y categorías.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="seguimiento-content"
                  id="seguimiento-header"
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Seguimiento de Progreso
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    Dashboard con métricas de estudio, rachas de días consecutivos y análisis de rendimiento.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="sesiones-content"
                  id="sesiones-header"
                >
                  <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                    Sesiones Estructuradas
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body2">
                    Realiza sesiones de estudio con cronómetro, autoevaluación y progreso visual.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* Right Content */}
        <Box sx={{ flex: 2, textAlign: 'center' }}>
          {/* Welcome Section */}
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

          {/* Description Section */}
          <Box sx={{ mb: 6, textAlign: 'left' }}>
            <Typography variant="h5" component="h3" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
              ¿Qué es StudySpace?
            </Typography>
            <Typography variant="body1" paragraph sx={{ lineHeight: 1.6, mb: 2 }}>
              StudySpace es una plataforma inteligente de gestión de estudio que implementa metodologías de repaso espaciado, creación de notas inteligentes y seguimiento de progreso académico. Optimiza tus sesiones de estudio mediante algoritmos adaptativos y análisis de rendimiento personalizado.
            </Typography>
          </Box>

          {/* Call to Action Button */}
          <Button
            variant="contained"
            size="large"
            component={Link}
            to="/login"
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.2rem',
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
      </Box>
    </Container>
  );
};

export default Landing;
