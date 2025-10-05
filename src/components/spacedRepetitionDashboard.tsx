import React, { useState, useMemo, useCallback } from 'react';
import { useReviews } from '../../hooks/useReviews';
import ReviewSessionList from './reviewSessionList';
import StudySession from './studySession';
import { BookOpen, Clock, TrendingUp, Play } from 'lucide-react';

const SpacedRepetitionDashboard: React.FC = () => {
  const {
    pendingReviews,
    upcomingReviews,
    loading,
    error,
    completeReview,
    getGroupedSessions,
    fetchAllReviews,
  } = useReviews();

  const [currentSession, setCurrentSession] = useState<number>(0);
  const [showStudySession, setShowStudySession] = useState(false);

  const upcomingCount = useMemo(() => {
    if (!upcomingReviews || typeof upcomingReviews !== 'object') return 0;
    
    return Object.values(upcomingReviews).reduce((total, dateGroup) => {
      return total + (Array.isArray(dateGroup) ? dateGroup.length : 0);
    }, 0);
  }, [upcomingReviews]);

  const handleSessionsUpdate = useCallback(() => {
    fetchAllReviews();
  }, [fetchAllReviews]);

  const startStudySession = () => {
    if (pendingReviews.length > 0) {
      setCurrentSession(0);
      setShowStudySession(true);
    }
  };

  const handleCompleteReview = async (difficulty: 1 | 2 | 3) => {
    const currentReview = pendingReviews[currentSession];
    
    try {
      await completeReview(currentReview.id, difficulty);
      
      if (currentSession < pendingReviews.length - 1) {
        setCurrentSession(prev => prev + 1);
      } else {
        setShowStudySession(false);
        setCurrentSession(0);
      }
    } catch (error) {
      console.error('Error completando revisión:', error);
    }
  };

  const handleExitStudySession = () => {
    setShowStudySession(false);
    setCurrentSession(0);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-4">
        <p className="text-red-800">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
        >
          Reintentar
        </button>
      </div>
    );
  }

  if (showStudySession && pendingReviews.length > 0 && currentSession < pendingReviews.length) {
    const currentReview = pendingReviews[currentSession];
    
    return (
      <StudySession
        review={currentReview}
        currentCard={currentSession + 1}
        totalCards={pendingReviews.length}
        onComplete={handleCompleteReview}
        onExit={handleExitStudySession}
      />
    );
  }

  const groupedSessions = getGroupedSessions();

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Sesiones de Repaso</h1>
            <p className="text-gray-600">
              Sistema de repaso espaciado para optimizar tu aprendizaje
            </p>
          </div>
          
          {pendingReviews.length > 0 && (
            <button
              onClick={startStudySession}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-700 transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
            >
              <Play size={20} />
              Iniciar Sesión ({pendingReviews.length})
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-red-100">
                <Clock size={24} className="text-red-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm mb-1">Pendientes Hoy</p>
                <p className="text-3xl font-bold text-gray-900">
                  {pendingReviews.length}
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
                  {pendingReviews.length + upcomingCount}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ReviewSessionList 
        sessions={groupedSessions} 
        onSessionsUpdate={handleSessionsUpdate}
      />
    </div>
  );
};

export default SpacedRepetitionDashboard;