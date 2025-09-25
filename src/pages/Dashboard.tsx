import React, { useState, useEffect } from 'react';
import { Search, Bell, Plus, BookOpen, Calendar, TrendingUp, Users, Settings, Home, FileText, Brain, Clock } from 'lucide-react';
import { useTopics } from '../../hooks/useTopics';
import { useAuth } from '../context/AuthContext';
import { TopicsManager } from '../components/topicsManager';
import { CardsManager } from '../components/cardsManager';

interface BaseTopic {
  id: number;
  name: string;
}

interface Topic extends BaseTopic {
  cards: number;
  lastStudied: string;
  difficulty: 'easy' | 'medium' | 'hard';
  progress: number;
}

const Dashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);

  const { topics, loading, error, fetchUserTopics } = useTopics();
  const { user } = useAuth();

  useEffect(() => {
    fetchUserTopics();
  }, []);

  // Map topics to include mock data for display
  const studyTopics: Topic[] = topics.map((topic: BaseTopic) => ({
    ...topic,
    cards: Math.floor(Math.random() * 50) + 10, // Mock cards count
    lastStudied: ['2 horas', '1 día', '3 horas', '1 semana', '2 días', '5 horas'][Math.floor(Math.random() * 6)],
    difficulty: ['easy', 'medium', 'hard'][Math.floor(Math.random() * 3)] as 'easy' | 'medium' | 'hard',
    progress: Math.floor(Math.random() * 100) + 1
  }));

  const todaysSessions = [
    { topic: 'Matemáticas Avanzadas', cards: 15, type: 'review' },
    { topic: 'Química Orgánica', cards: 8, type: 'new' },
    { topic: 'Historia Universal', cards: 12, type: 'review' }
  ];

  const filteredTopics = studyTopics.filter((topic: Topic) =>
    topic.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeFilter === 'all' || topic.difficulty === activeFilter)
  );

  const getDifficultyColor = (difficulty: 'easy' | 'medium' | 'hard'): string => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar - Oculta en móviles, visible en pantallas grandes */}
      <div className="hidden lg:block lg:w-64 bg-white border-r border-gray-200 shadow-md fixed h-full z-10">
        <div className="flex items-center gap-3 p-6 border-b border-gray-200">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
            <Brain size={24} className="text-white" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">
            Study Space
          </h1>
        </div>
        <nav className="p-4 flex flex-col gap-2">
          <a href="#" className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600">
            <Home size={20} />
            Dashboard
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600">
            <BookOpen size={20} />
            Mis Temas
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600">
            <FileText size={20} />
            Tarjetas
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600">
            <Calendar size={20} />
            Calendario
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600">
            <TrendingUp size={20} />
            Progreso
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600">
            <Users size={20} />
            Comunidad
          </a>
          <a href="#" className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600">
            <Settings size={20} />
            Configuración
          </a>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header - Barra de navegación superior para móviles y grandes */}
        <header className="bg-white rounded-xl shadow-sm mb-6 p-4 flex items-center justify-between lg:p-6 lg:justify-start lg:gap-8">
          <div className="flex-1 lg:max-w-xl">
            <h2 className="text-lg font-bold text-gray-900 mb-2 lg:text-2xl">
              ¡Bienvenido de vuelta, Estudiante! 👋
            </h2>
            <div className="relative">
              <Search size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar temas, tarjetas, materias..."
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <button className="relative p-2 text-gray-600 rounded-xl transition-colors hover:bg-gray-100">
              <Bell size={24} />
              <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
            </button>
            <button className="hidden lg:flex items-center gap-2 px-4 py-3 rounded-xl font-medium text-white bg-gradient-to-br from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300">
              <Plus size={16} />
              Nuevo Tema
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main>
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100">
                  <BookOpen size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Temas Activos</p>
                  <p className="text-3xl font-bold text-gray-900">{topics.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-100">
                  <FileText size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Tarjetas Total</p>
                  <p className="text-3xl font-bold text-gray-900">{studyTopics.reduce((sum: number, topic: Topic) => sum + topic.cards, 0)}</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100">
                  <Clock size={24} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Racha Actual</p>
                  <p className="text-3xl font-bold text-gray-900">7 días</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-100">
                  <TrendingUp size={24} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Progreso Promedio</p>
                  <p className="text-3xl font-bold text-gray-900">{studyTopics.length > 0 ? Math.round(studyTopics.reduce((sum: number, topic: Topic) => sum + topic.progress, 0) / studyTopics.length) : 0}%</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tus Temas */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
              <TopicsManager onSelectTopic={setSelectedTopicId} />
            </div>

            {/* Sidebar Right */}
            <div className="flex flex-col gap-6">
              {/* Sesiones de Hoy */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Sesiones de Hoy</h3>
                <div className="flex flex-col gap-3 mb-4">
                  {todaysSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-100 rounded-xl">
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{session.topic}</p>
                        <p className="text-xs text-gray-600">{session.cards} tarjetas</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-lg ${session.type === 'review' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                        {session.type === 'review' ? 'Repaso' : 'Nuevo'}
                      </span>
                    </div>
                  ))}
                </div>
                <button className="w-full px-4 py-3 rounded-xl font-medium text-white bg-gradient-to-br from-indigo-500 to-purple-600 hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300">
                  Comenzar Sesión
                </button>
              </div>

              {/* Progreso Semanal */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Progreso Semanal</h3>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tarjetas estudiadas</span>
                    <span className="font-semibold text-gray-900">89/120</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full" style={{ width: '74%' }}></div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tiempo total</span>
                    <span className="font-semibold text-gray-900">12h 30min</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Manager - Show when a topic is selected */}
          {selectedTopicId && (
            <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <CardsManager topicId={selectedTopicId} />
            </div>
          )}
        </main>
      </div>

      {/* Bottom Navigation for Mobile */}
      <div className="fixed bottom-0 left-0 right-0 lg:hidden bg-white border-t border-gray-200 shadow-lg z-20">
        <nav className="flex justify-around p-3">
          <a href="#" className="flex flex-col items-center text-sm font-medium text-indigo-600">
            <Home size={24} />
            <span className="mt-1">Dashboard</span>
          </a>
          <a href="#" className="flex flex-col items-center text-sm font-medium text-gray-500 hover:text-indigo-600">
            <BookOpen size={24} />
            <span className="mt-1">Temas</span>
          </a>
          <a href="#" className="flex flex-col items-center text-sm font-medium text-gray-500 hover:text-indigo-600">
            <Plus size={24} />
            <span className="mt-1">Nuevo</span>
          </a>
          <a href="#" className="flex flex-col items-center text-sm font-medium text-gray-500 hover:text-indigo-600">
            <Calendar size={24} />
            <span className="mt-1">Calendario</span>
          </a>
          <a href="#" className="flex flex-col items-center text-sm font-medium text-gray-500 hover:text-indigo-600">
            <Settings size={24} />
            <span className="mt-1">Config</span>
          </a>
        </nav>
      </div>
    </div>
  );
};

export default Dashboard;