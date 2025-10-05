import React from 'react';
import CalendarWidget from '../components/calendarWidget';
import { Link } from 'react-router-dom';
import { Brain, Home, BookOpen, FileText, Calendar, TrendingUp, Users, Settings } from 'lucide-react';

const CalendarPage: React.FC = () => {
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
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600"
            >
              <FileText size={20} /> Sesiones de Estudio
            </Link>
            <Link
              to="/calendar"
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-indigo-600 font-medium bg-indigo-50"
            >
              <Calendar size={20} /> Calendario
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
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">Calendario de Estudio</h1>
                  <p className="text-gray-600">
                    Visualiza todas tus sesiones de estudio programadas
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <CalendarWidget className="text-base" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarPage;