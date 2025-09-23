import React, { useState } from 'react';
import { Search, Bell, Plus, BookOpen, Calendar, TrendingUp, Users, Settings, Home, FileText, Brain, Clock } from 'lucide-react';

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  // Datos de ejemplo para el dashboard
  const studyTopics = [
    { id: 1, name: 'Matemáticas Avanzadas', cards: 45, lastStudied: '2 horas', difficulty: 'hard', progress: 75 },
    { id: 2, name: 'Historia Universal', cards: 32, lastStudied: '1 día', difficulty: 'medium', progress: 60 },
    { id: 3, name: 'Química Orgánica', cards: 28, lastStudied: '3 horas', difficulty: 'hard', progress: 40 },
    { id: 4, name: 'Literatura Española', cards: 22, lastStudied: '1 semana', difficulty: 'easy', progress: 90 },
    { id: 5, name: 'Física Cuántica', cards: 38, lastStudied: '2 días', difficulty: 'hard', progress: 25 },
    { id: 6, name: 'Biología Celular', cards: 41, lastStudied: '5 horas', difficulty: 'medium', progress: 80 }
  ];

  const todaysSessions = [
    { topic: 'Matemáticas Avanzadas', cards: 15, type: 'review' },
    { topic: 'Química Orgánica', cards: 8, type: 'new' },
    { topic: 'Historia Universal', cards: 12, type: 'review' }
  ];

  const filteredTopics = studyTopics.filter(topic =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeFilter === 'all' || topic.difficulty === activeFilter)
  );

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <>
      <style>{`
        .gradient-text {
          background: linear-gradient(135deg, #667eea, #764ba2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          color: transparent;
        }

        .gradient-bg {
          background: linear-gradient(135deg, #667eea, #764ba2);
        }

        .gradient-border {
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: 1px solid transparent;
          background-clip: padding-box;
        }

        .hover-lift {
          transition: all 0.3s ease;
        }

        .hover-lift:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .sidebar {
          background: white;
          border-right: 1px solid #e5e7eb;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }

        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 12px;
          transition: all 0.2s ease;
          text-decoration: none;
          color: #6b7280;
        }

        .nav-item.active {
          background: #eef2ff;
          color: #4f46e5;
          font-weight: 500;
        }

        .nav-item:hover:not(.active) {
          background: #f9fafb;
        }

        .search-input {
          width: 100%;
          padding: 12px 16px 12px 40px;
          background: #f9fafb;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          outline: none;
          transition: all 0.2s ease;
        }

        .search-input:focus {
          ring: 2px solid #4f46e5;
          border-color: transparent;
          background: white;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 16px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          border: 1px solid #f3f4f6;
        }

        .topic-card {
          padding: 16px;
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .topic-card:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          border-color: #d1d5db;
        }

        .filter-button {
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          cursor: pointer;
          border: none;
          background: transparent;
        }

        .filter-button.active {
          background: #eef2ff;
          color: #4338ca;
        }

        .filter-button:not(.active) {
          color: #6b7280;
        }

        .filter-button:not(.active):hover {
          background: #f3f4f6;
        }

        .progress-bar {
          width: 100%;
          background: #e5e7eb;
          border-radius: 9999px;
          height: 8px;
          overflow: hidden;
        }

        .progress-fill {
          background: linear-gradient(90deg, #667eea, #764ba2);
          height: 100%;
          border-radius: 9999px;
          transition: width 0.3s ease;
        }

        .session-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px;
          background: #f9fafb;
          border-radius: 12px;
        }

        .badge {
          padding: 4px 8px;
          font-size: 12px;
          font-weight: 500;
          border-radius: 8px;
        }

        .badge.review {
          background: #dbeafe;
          color: #1e40af;
        }

        .badge.new {
          background: #d1fae5;
          color: #065f46;
        }

        .notification-dot {
          width: 12px;
          height: 12px;
          background: #ef4444;
          border-radius: 50%;
          position: absolute;
          top: -4px;
          right: -4px;
        }

        .icon-container {
          padding: 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .icon-blue { background: #dbeafe; }
        .icon-green { background: #d1fae5; }
        .icon-purple { background: #f3e8ff; }
        .icon-orange { background: #fed7aa; }
      `}</style>

      <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
        {/* Sidebar */}
        <div style={{
          position: 'fixed',
          left: 0,
          top: 0,
          height: '100vh',
          width: '256px',
          zIndex: 10
        }} className="sidebar">
          {/* Logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '24px',
            borderBottom: '1px solid #f3f4f6'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }} className="gradient-bg">
              <Brain size={24} color="white" />
            </div>
            <h1 style={{
              fontSize: '20px',
              fontWeight: '700'
            }} className="gradient-text">
              Study Space
            </h1>
          </div>

          {/* Navigation */}
          <nav style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a href="#" className="nav-item active">
              <Home size={20} />
              Dashboard
            </a>
            <a href="#" className="nav-item">
              <BookOpen size={20} />
              Mis Temas
            </a>
            <a href="#" className="nav-item">
              <FileText size={20} />
              Tarjetas
            </a>
            <a href="#" className="nav-item">
              <Calendar size={20} />
              Calendario
            </a>
            <a href="#" className="nav-item">
              <TrendingUp size={20} />
              Progreso
            </a>
            <a href="#" className="nav-item">
              <Users size={20} />
              Comunidad
            </a>
            <a href="#" className="nav-item">
              <Settings size={20} />
              Configuración
            </a>
          </nav>
        </div>

        {/* Main Content */}
        <div style={{ marginLeft: '256px' }}>
          {/* Header */}
          <header style={{
            background: 'white',
            borderBottom: '1px solid #e5e7eb',
            padding: '16px 32px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ flex: 1, maxWidth: '512px' }}>
                <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#111827', marginBottom: '16px' }}>
                  ¡Bienvenido de vuelta, Estudiante! 👋
                </h2>

                {/* Barra de búsqueda */}
                <div style={{ position: 'relative' }}>
                  <Search style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af'
                  }} size={20} />
                  <input
                    type="text"
                    placeholder="Buscar temas, tarjetas, materias..."
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginLeft: '32px' }}>
                <button style={{
                  position: 'relative',
                  padding: '8px',
                  color: '#6b7280',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }} onMouseOver={(e) => (e.target as HTMLElement).style.background = '#f3f4f6'}
                   onMouseOut={(e) => (e.target as HTMLElement).style.background = 'transparent'}>
                  <Bell size={24} />
                  <div className="notification-dot"></div>
                </button>

                <button style={{
                  padding: '8px 16px',
                  borderRadius: '12px',
                  fontWeight: '500',
                  color: 'white',
                  border: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'all 0.3s ease'
                }} className="gradient-bg hover-lift">
                  <Plus size={16} />
                  Nuevo Tema
                </button>
              </div>
            </div>
          </header>

          {/* Dashboard Content */}
          <main style={{ padding: '32px' }}>
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '24px',
              marginBottom: '32px'
            }}>
              <div className="stat-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="icon-container icon-blue">
                    <BookOpen size={24} color="#2563eb" />
                  </div>
                  <div>
                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>Temas Activos</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>12</p>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="icon-container icon-green">
                    <FileText size={24} color="#059669" />
                  </div>
                  <div>
                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>Tarjetas Total</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>248</p>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="icon-container icon-purple">
                    <Clock size={24} color="#7c3aed" />
                  </div>
                  <div>
                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>Racha Actual</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>7 días</p>
                  </div>
                </div>
              </div>

              <div className="stat-card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div className="icon-container icon-orange">
                    <TrendingUp size={24} color="#ea580c" />
                  </div>
                  <div>
                    <p style={{ color: '#6b7280', fontSize: '14px', margin: '0 0 4px 0' }}>Progreso Promedio</p>
                    <p style={{ fontSize: '32px', fontWeight: '700', color: '#111827', margin: 0 }}>68%</p>
                  </div>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr',
              gap: '32px'
            }}>
              {/* Tus Temas */}
              <div style={{
                background: 'white',
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                border: '1px solid #f3f4f6'
              }}>
                <div style={{
                  padding: '24px',
                  borderBottom: '1px solid #f3f4f6'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#111827', margin: 0 }}>Tus Temas</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => setActiveFilter('all')}
                        className={`filter-button ${activeFilter === 'all' ? 'active' : ''}`}
                      >
                        Todos
                      </button>
                      <button
                        onClick={() => setActiveFilter('easy')}
                        className={`filter-button ${activeFilter === 'easy' ? 'active' : ''}`}
                      >
                        Fácil
                      </button>
                      <button
                        onClick={() => setActiveFilter('medium')}
                        className={`filter-button ${activeFilter === 'medium' ? 'active' : ''}`}
                      >
                        Medio
                      </button>
                      <button
                        onClick={() => setActiveFilter('hard')}
                        className={`filter-button ${activeFilter === 'hard' ? 'active' : ''}`}
                      >
                        Difícil
                      </button>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {filteredTopics.map((topic) => (
                      <div key={topic.id} className="topic-card">
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                          <h4 style={{ fontWeight: '600', color: '#111827', margin: 0 }}>{topic.name}</h4>
                          <span style={{ padding: '4px 8px', fontSize: '12px', fontWeight: '500', borderRadius: '8px', border: '1px solid' }} className={getDifficultyColor(topic.difficulty)}>
                            {topic.difficulty === 'easy' ? 'Fácil' : topic.difficulty === 'medium' ? 'Medio' : 'Difícil'}
                          </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', fontSize: '14px', color: '#6b7280', marginBottom: '12px' }}>
                          <span>{topic.cards} tarjetas</span>
                          <span>•</span>
                          <span>Estudiado hace {topic.lastStudied}</span>
                        </div>

                        <div className="progress-bar" style={{ marginBottom: '8px' }}>
                          <div className="progress-fill" style={{ width: `${topic.progress}%` }}></div>
                        </div>
                        <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{topic.progress}% completado</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Right */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Sesiones de Hoy */}
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #f3f4f6',
                  padding: '24px'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>Sesiones de Hoy</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {todaysSessions.map((session, index) => (
                      <div key={index} className="session-card">
                        <div>
                          <p style={{ fontWeight: '500', color: '#111827', fontSize: '14px', margin: '0 0 4px 0' }}>{session.topic}</p>
                          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>{session.cards} tarjetas</p>
                        </div>
                        <span className={`badge ${session.type}`}>
                          {session.type === 'review' ? 'Repaso' : 'Nuevo'}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button style={{
                    width: '100%',
                    marginTop: '16px',
                    color: 'white',
                    padding: '8px',
                    borderRadius: '12px',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease'
                  }} className="gradient-bg hover-lift">
                    Comenzar Sesión
                  </button>
                </div>

                {/* Progreso Semanal */}
                <div style={{
                  background: 'white',
                  borderRadius: '16px',
                  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #f3f4f6',
                  padding: '24px'
                }}>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>Progreso Semanal</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>Tarjetas estudiadas</span>
                      <span style={{ fontWeight: '600', color: '#111827' }}>89/120</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ width: '74%' }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '14px', color: '#6b7280' }}>Tiempo total</span>
                      <span style={{ fontWeight: '600', color: '#111827' }}>12h 30min</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
