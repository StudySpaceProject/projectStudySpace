import { Outlet, Link } from "react-router-dom";
import { Bell, Brain, Home, BookOpen, FileText, Calendar, TrendingUp, Users, Settings } from "lucide-react";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar */}
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
          <Link
            to="/topics"
            className="flex items-center gap-3 p-3 rounded-xl text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600"
          >
            <BookOpen size={20} /> Mis Temas
          </Link>
          <Link
            to="/study-sections"
            className="flex items-center gap-3 p-3 rounded-xl text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600"
          >
            <FileText size={20} /> Sesiones de Estudio
          </Link>
          <Link
            to="/calendar"
            className="flex items-center gap-3 p-3 rounded-xl text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600"
          >
            <Calendar size={20} /> Calendario
          </Link>
          <Link
            to="/progress"
            className="flex items-center gap-3 p-3 rounded-xl text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600"
          >
            <TrendingUp size={20} /> Progreso
          </Link>
          <Link
            to="/community"
            className="flex items-center gap-3 p-3 rounded-xl text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600"
          >
            <Users size={20} /> Comunidad
          </Link>
          <Link
            to="/settings"
            className="flex items-center gap-3 p-3 rounded-xl text-gray-600 font-medium hover:bg-gray-100 hover:text-indigo-600"
          >
            <Settings size={20} /> Configuración
          </Link>
        </nav>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 lg:ml-64 p-4 lg:p-8">
        {/* Header */}
        <header className="bg-white rounded-xl shadow-sm mb-6 p-4 flex items-center justify-between lg:p-6 lg:gap-8">
          <h2 className="text-lg font-bold text-gray-900 lg:text-2xl">
            ¡Bienvenido de vuelta! 👋
          </h2>
          <button className="relative p-2 text-gray-600 rounded-xl hover:bg-gray-100">
            <Bell size={24} />
            <div className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
          </button>
        </header>

        {/* Aquí se renderizan las páginas */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
