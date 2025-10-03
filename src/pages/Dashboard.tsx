import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Bell,
  Brain,
  Home,
  BookOpen,
  FileText,
  Calendar,
  TrendingUp,
  Users,
  Settings,
  Clock,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { TopicsManager } from "../components/topicsManager";
import { CardsManager } from "../components/cardsManager";
import { Topic } from "../types/topics";

const Dashboard = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { getDashboard } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      const data = await getDashboard();
      setDashboardData(data);
    };
    fetchDashboard();
  }, []);

  // Cerrar menú al hacer clic en un enlace
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Prevenir scroll cuando el menú está abierto (solo mobile)
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { to: "/dashboard", icon: Home, label: "Dashboard" },
    { to: "#", icon: BookOpen, label: "Mis Temas" },
    { to: "/study-sections", icon: FileText, label: "Sesiones de Estudio" },
    { to: "#", icon: Calendar, label: "Calendario" },
    { to: "#", icon: TrendingUp, label: "Progreso" },
    { to: "#", icon: Users, label: "Comunidad" },
    { to: "#", icon: Settings, label: "Configuración" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Mobile */}
      <header className="lg:hidden bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <button
              className="p-2 text-gray-600 rounded-xl transition-colors hover:bg-gray-100 active:scale-95"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu size={24} />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                <Brain size={18} className="text-white" />
              </div>
              <h1 className="text-lg font-bold bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Study Space
              </h1>
            </div>
          </div>
          <button className="relative p-2 text-gray-600 rounded-xl transition-colors hover:bg-gray-100">
            <Bell size={20} />
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></div>
          </button>
        </div>
      </header>

      {/* Overlay para cerrar el menú al hacer clic fuera */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar Mobile - Slide from left */}
      <div
        className={`fixed top-0 left-0 bottom-0 w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header del menú */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                <Brain size={24} className="text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-br from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Study Space
              </h1>
            </div>
            <button
              className="p-2 text-gray-600 rounded-xl transition-colors hover:bg-gray-100 active:scale-95"
              onClick={() => setIsMenuOpen(false)}
              aria-label="Cerrar menú"
            >
              <X size={24} />
            </button>
          </div>

          {/* User info */}
          <div className="p-6 border-b border-gray-200 bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg">
                {dashboardData?.user?.email?.[0]?.toUpperCase() || "E"}
              </div>
              <div>
                <p className="font-semibold text-gray-900">¡Hola! 👋</p>
                <p className="text-sm text-gray-600 truncate max-w-[200px]">
                  {dashboardData?.user?.email || "Estudiante"}
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.label}
                    to={link.to}
                    className="flex items-center gap-3 p-4 rounded-xl transition-all duration-200 text-gray-700 font-medium hover:bg-indigo-50 hover:text-indigo-600 active:scale-95"
                    onClick={handleLinkClick}
                  >
                    <Icon size={22} />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </nav>

          {/* Footer del menú */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                🔥 Racha de {dashboardData?.stats?.currentStreak || 0} días
              </p>
              <p className="text-xs text-gray-600">
                ¡Sigue así para mantener tu progreso!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Desktop - Static */}
      <div className="hidden lg:block lg:fixed lg:top-0 lg:left-0 lg:bottom-0 lg:w-64 bg-white border-r border-gray-200 shadow-sm">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
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
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.label}
                to={link.to}
                className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600"
              >
                <Icon size={20} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Header Desktop */}
      <header className="hidden lg:block bg-white shadow-sm fixed top-0 left-64 right-0 z-20">
        <div className="p-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">
            ¡Bienvenido de vuelta, {dashboardData?.user?.email || "Estudiante"}! 👋
          </h2>
          <div className="flex items-center gap-6">
            <button className="relative p-2 text-gray-600 rounded-xl transition-colors hover:bg-gray-100">
              <Bell size={24} />
              <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="lg:ml-64 lg:pt-20">
        <div className="p-4 lg:p-8">
          {/* Welcome message mobile */}
          <div className="lg:hidden mb-6 bg-white rounded-xl shadow-sm p-4">
            <h2 className="text-lg font-bold text-gray-900">
              ¡Bienvenido de vuelta! 👋
            </h2>
            <p className="text-sm text-gray-600 mt-1">
              {dashboardData?.user?.email || "Estudiante"}
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6 lg:mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100">
                  <BookOpen size={24} className="text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Temas Activos</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardData?.stats?.totalTopics || 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-100">
                  <FileText size={24} className="text-green-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Tarjetas Total</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardData?.stats?.totalCards || 0}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100">
                  <Clock size={24} className="text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Racha Actual</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {dashboardData?.stats?.currentStreak || 0} días
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-100">
                  <TrendingUp size={24} className="text-orange-600" />
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Progreso Promedio</p>
                  <p className="text-3xl font-bold text-gray-900">0%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Topics Manager */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
            <TopicsManager
              onSelectTopic={setSelectedTopicId}
              onTopicsChange={(updatedTopics) => setTopics(updatedTopics)}
            />
          </div>

          {/* Cards Manager */}
          {selectedTopicId && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <CardsManager topicId={selectedTopicId} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;