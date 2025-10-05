import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SpacedRepetitionDashboard from '../components/spacedRepetitionDashboard';
import { useReviews } from '../../hooks/useReviews';
import CalendarWidget from '../components/calendarWidget';
import { Brain, Home, BookOpen, FileText, TrendingUp, Users, Settings, Clock } from 'lucide-react';

const StudySessions = () => {
  const { fetchAllReviews, pendingReviews, upcomingReviews } = useReviews();

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const upcomingCount = upcomingReviews && typeof upcomingReviews === 'object' 
    ? Object.values(upcomingReviews).reduce((total, dateGroup) => {
        return total + (Array.isArray(dateGroup) ? dateGroup.length : 0);
      }, 0)
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        <div className="w-64 bg-white border-r border-gray-200 shadow-md h-screen sticky top-0 hidden lg:block">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                <Brain size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Study Space
              </h1>
            </div>
          </div>
          
          <nav className="p-4 flex flex-col gap-2">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600"
            >
              <Home size={20} /> Dashboard
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600"
            >
              <BookOpen size={20} /> Mis Temas
            </Link>
            <Link
              to="/study-sessions"
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-indigo-600 font-medium bg-indigo-50"
            >
              <FileText size={20} /> Sesiones de Estudio
            </Link>
            
            <Link
              to="#"
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600"
            >
              <TrendingUp size={20} /> Progreso
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600"
            >
              <Users size={20} /> Comunidad
            </Link>
            <Link
              to="#"
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600"
            >
              <Settings size={20} /> Configuración
            </Link>
          </nav>
        </div>

        <div className="flex-1 p-4 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Contadores y Calendario */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Sesiones de Repaso</h1>
                  <p className="text-gray-600">
                    Sistema de repaso espaciado para optimizar tu aprendizaje
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-100">
                          <Clock size={24} className="text-red-600" />
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm mb-1">Pendientes Hoy</p>
                          <p className="text-3xl font-bold text-gray-900">
                            {pendingReviews?.length || 0}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-100">
                          <BookOpen size={24} className="text-orange-600" />
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm mb-1">Próximos 7 días</p>
                          <p className="text-3xl font-bold text-gray-900">
                            {upcomingCount}
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100">
                          <TrendingUp size={24} className="text-purple-600" />
                        </div>
                        <div>
                          <p className="text-gray-600 text-sm mb-1">Total Programadas</p>
                          <p className="text-3xl font-bold text-gray-900">
                            {(pendingReviews?.length || 0) + upcomingCount}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-1">
                  <CalendarWidget />
                </div>
              </div>
            </div>

            {/* Dashboard de repetición espaciada */}
            <SpacedRepetitionDashboard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySessions;