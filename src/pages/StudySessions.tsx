import React, { useEffect } from "react";
import SpacedRepetitionDashboard from "../components/spacedRepetitionDashboard";
import { useReviews } from "../../hooks/useReviews";
import CalendarWidget from "../components/calendarWidget";
import { BookOpen, TrendingUp, Clock } from "lucide-react";

const StudySessions = () => {
  const { fetchAllReviews, pendingReviews, upcomingReviews } = useReviews();

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const upcomingCount =
    upcomingReviews && typeof upcomingReviews === "object"
      ? Object.values(upcomingReviews).reduce((total, dateGroup) => {
          return total + (Array.isArray(dateGroup) ? dateGroup.length : 0);
        }, 0)
      : 0;

  return (
    <div className="max-w-7xl mx-auto">
      {/* Contadores y Calendario */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Sesiones de Repaso
            </h1>
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
                    <p className="text-gray-600 text-sm mb-1">
                      Próximos 7 días
                    </p>
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
                    <p className="text-gray-600 text-sm mb-1">
                      Total Programadas
                    </p>
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
  );
};

export default StudySessions;
