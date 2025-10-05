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

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white rounded-xl shadow-sm mb-6 p-4 flex items-center justify-between lg:p-6 lg:justify-start lg:gap-8 lg:fixed lg:top-0 lg:left-64 lg:right-0 lg:z-20 lg:rounded-none lg:shadow-none">
        <div className="flex items-center gap-4">
          <button
            className="lg:hidden p-2 text-gray-600 rounded-xl transition-colors hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-bold text-gray-900 mb-2 lg:text-2xl">
            ¡Bienvenido de vuelta, {dashboardData?.user?.email || "Estudiante"}!
            👋
          </h2>
        </div>
        <div className="flex items-center gap-4 lg:gap-6">
          <button className="relative p-2 text-gray-600 rounded-xl transition-colors hover:bg-gray-100">
            <Bell size={24} />
            <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
          </button>
        </div>
      </header>
      <div className="flex flex-col lg:flex-row">
        <div className={`${isMenuOpen ? "block" : "hidden"} lg:block lg:w-64 bg-white border-r border-gray-200 shadow-md lg:h-full`}>
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
              className="lg:hidden p-2 text-gray-600 rounded-xl transition-colors hover:bg-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </button>
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
              className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600"
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

        <div className="flex-1 p-4 lg:p-8 lg:pt-20">
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100">
                    <BookOpen size={24} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">
                      Temas Activos
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardData?.stats?.totalTopics}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-green-100">
                    <FileText size={24} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">
                      Tarjetas Total
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardData?.stats?.totalCards}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-purple-100">
                    <Clock size={24} className="text-purple-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">
                      Racha Actual
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {dashboardData?.stats?.currentStreak || 0} días
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-orange-100">
                    <TrendingUp size={24} className="text-orange-600" />
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">
                      Progreso Promedio
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {0}
                      %
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <main>
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 lg:col-span-2">
              <TopicsManager
                onSelectTopic={setSelectedTopicId}
                onTopicsChange={(updatedTopics) => setTopics(updatedTopics)}
              />
            </div>

            {selectedTopicId && (
              <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <CardsManager topicId={selectedTopicId} />
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;