import { useState, useEffect } from 'react';
import { 
  ScheduledReview,
  UpcomingReviews,
  ReviewSession 
} from '../src/types/reviews';

const API_BASE = '/api/spaced-repetition';

export const useReviews = () => {
  const [pendingReviews, setPendingReviews] = useState<ScheduledReview[]>([]);
  const [upcomingReviews, setUpcomingReviews] = useState<UpcomingReviews>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllReviews = async () => {
    try {
      setLoading(true);
      await Promise.all([
        fetchPendingReviews(),
        fetchUpcomingReviews(),
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de carga de revisiones');
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingReviews = async () => {
    try {
      const response = await fetch(`${API_BASE}/pending-reviews`);
      if (!response.ok) throw new Error('Error de carga de revisiones de hoy');
      const data = await response.json();
      setPendingReviews(data.pendingReviews);
    } catch (err) {
      throw err;
    }
  };

  const fetchUpcomingReviews = async (days: number = 7) => {
    try {
      const response = await fetch(`${API_BASE}/upcoming-reviews?days=${days}`);
      if (!response.ok) throw new Error('Error de carga de revisiones de los próximos días');
      const data = await response.json();
      setUpcomingReviews(data.upcomingReviews);
    } catch (err) {
      throw err;
    }
  };

  const completeReview = async (scheduledReviewId: number, difficultyRating: 1 | 2 | 3) => {
    try {
      const response = await fetch(`${API_BASE}/complete-review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          scheduledReviewId,
          difficultyRating,
        }),
      });

      if (!response.ok) throw new Error('Error al completar la revisión');

      const result = await response.json();
      
      await fetchAllReviews();
      
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al completar la revisión');
      throw err;
    }
  };

  const rescheduleReview = async (reviewId: number, newDate: string) => {
    try {
      const response = await fetch(`${API_BASE}/${reviewId}/reschedule`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newDate }),
      });

      if (!response.ok) throw new Error('Error reprogramando la revisión');

      const result = await response.json();
      
      await fetchAllReviews();
      
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error reprogramando la revisión');
      throw err;
    }
  };

  const getGroupedSessions = (): ReviewSession[] => {
    const sessions: ReviewSession[] = [];

    // Pendientes
    pendingReviews.forEach(review => {
      sessions.push({
        id: review.id,
        type: 'pending',
        dueDate: review.dueDate,
        card: review.card,
        intervalDays: review.intervalDays
      });
    });

    // Próximas
    Object.values(upcomingReviews).flat().forEach(review => {
      sessions.push({
        id: review.id,
        type: 'upcoming',
        dueDate: review.dueDate,
        card: review.card,
      });
    });

    return sessions.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  return {
    // Estado
    pendingReviews,
    upcomingReviews,
    loading,
    error,
    
    // Métodos
    fetchAllReviews,
    fetchPendingReviews,
    fetchUpcomingReviews,
    completeReview,
    rescheduleReview,
    getGroupedSessions,
  };
};