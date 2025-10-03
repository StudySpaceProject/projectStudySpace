import React from 'react';
import { ReviewSession } from '../types/reviews';
import { Calendar, Clock, BookOpen } from 'lucide-react';

interface ReviewSessionCardProps {
  session: ReviewSession;
}

const ReviewSessionCard: React.FC<ReviewSessionCardProps> = ({ session }) => {
  const getStatusConfig = (type: string) => {
    switch (type) {
      case 'pending':
        return {
          color: 'red',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
          textColor: 'text-red-700',
          label: 'Pendiente'
        };
      case 'upcoming':
        return {
          color: 'orange',
          bgColor: 'bg-orange-50',
          borderColor: 'border-orange-200',
          textColor: 'text-orange-700',
          label: 'Programada'
        };
      case 'completed':
        return {
          color: 'green',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
          textColor: 'text-green-700',
          label: 'Completada'
        };
      default:
        return {
          color: 'gray',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
          textColor: 'text-gray-700',
          label: 'Desconocido'
        };
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDifficultyText = (rating?: number) => {
    if (!rating) return '';
    
    switch (rating) {
      case 1: return 'Fácil';
      case 2: return 'Medio';
      case 3: return 'Difícil';
      default: return '';
    }
  };

  const getDifficultyColor = (rating?: number) => {
    if (!rating) return 'gray';
    
    switch (rating) {
      case 1: return 'green';
      case 2: return 'orange';
      case 3: return 'red';
      default: return 'gray';
    }
  };

  const status = getStatusConfig(session.type);

  return (
    <div className={`bg-white border rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-200 ${status.borderColor}`}>
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <div className={`w-3 h-3 rounded-full bg-${status.color}-500`}></div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.bgColor} ${status.textColor}`}>
              {status.label}
            </span>
          </div>
          
          <h3 className="font-semibold text-gray-900 text-lg mb-1">
            {session.card.topic.name}
          </h3>
          <p className="text-gray-600 line-clamp-2">{session.card.question}</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <div className="flex items-center gap-1">
          <Calendar size={16} />
          <span>{formatDate(session.dueDate)}</span>
        </div>
        
        {session.type === 'completed' && session.completedAt && (
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>Completada: {new Date(session.completedAt).toLocaleDateString()}</span>
          </div>
        )}
      </div>

      {session.type === 'completed' && session.difficultyRating && (
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm font-medium text-gray-700">Dificultad:</span>
          <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getDifficultyColor(session.difficultyRating)}-100 text-${getDifficultyColor(session.difficultyRating)}-700`}>
            {getDifficultyText(session.difficultyRating)}
          </span>
        </div>
      )}

      {session.intervalDays && (
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <BookOpen size={16} />
          <span>Intervalo: {session.intervalDays} días</span>
        </div>
      )}

      {session.type === 'upcoming' && (
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100">
          <button className="flex-1 text-xs bg-indigo-100 text-indigo-700 px-3 py-2 rounded-lg hover:bg-indigo-200 transition-colors font-medium">
            Reagendar
          </button>
          <button className="flex-1 text-xs bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            Ver Detalles
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewSessionCard;