import React, { useState, useEffect } from "react";
import { BookOpen, FileText, TrendingUp, Clock } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { TopicsManager } from "../components/topicsManager";
import { CardsManager } from "../components/cardsManager";
import { Topic } from "../types/topics";

const Dashboard = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<number | null>(null);
  const [dashboardData, setDashboardData] = useState<any | null>(null);
  const [topics, setTopics] = useState<Topic[]>([]);

  const { getDashboard } = useAuth();

  useEffect(() => {
    const fetchDashboard = async () => {
      const data = await getDashboard();
      setDashboardData(data);
    };
    fetchDashboard();
  }, []);

  return (
    <div>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-blue-100">
              <BookOpen size={24} className="text-blue-600" />
            </div>
            <div>
              <p className="text-gray-600 text-sm mb-1">Temas Activos</p>
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
              <p className="text-gray-600 text-sm mb-1">Tarjetas Total</p>
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
              <p className="text-gray-600 text-sm mb-1">Racha Actual</p>
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
              <p className="text-gray-600 text-sm mb-1">Progreso Promedio</p>
              <p className="text-3xl font-bold text-gray-900">{0}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Topics Manager */}
      <TopicsManager
        onSelectTopic={setSelectedTopicId}
        onTopicsChange={(updatedTopics) => setTopics(updatedTopics)}
        selectedTopicId={selectedTopicId} // ✅ pasar el tema seleccionado
      />

      {/* Cards Manager */}
      {selectedTopicId && (
        <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <CardsManager topicId={selectedTopicId} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
