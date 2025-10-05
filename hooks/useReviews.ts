import { useState, useEffect, useCallback } from 'react';
import { 
  ScheduledReview,
  UpcomingReviews,
  ReviewSession,
  UpcomingReviewItem
} from '../src/types/reviews';
import { API_URL } from "../src/config";

const API_BASE = API_URL || "http://localhost:3000/api";

export const useReviews = () => {
  const [pendingReviews, setPendingReviews] = useState<ScheduledReview[]>([]);
  const [upcomingReviews, setUpcomingReviews] = useState<UpcomingReviews>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAllReviews = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      await Promise.all([
        fetchPendingReviews(),
        fetchUpcomingReviews(),
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de carga de revisiones');
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchPendingReviews = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/reviews/pending`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Error de carga de revisiones de hoy');
      const data = await response.json();
      setPendingReviews(data.pendingReviews || []);
    } catch (err) {
      setPendingReviews([]);
      throw err;
    }
  };

  const fetchUpcomingReviews = async (days: number = 7) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/reviews/upcoming?days=${days}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('Error de carga de revisiones de los próximos días');
      const data = await response.json();
      setUpcomingReviews(data.upcomingReviews || {});
    } catch (err) {
      setUpcomingReviews({});
      throw err;
    }
  };

  const completeReview = async (scheduledReviewId: number, difficultyRating: 1 | 2 | 3) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/reviews/complete`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
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
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_BASE}/reviews/reschedule/${reviewId}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newDate }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error reprogramando la revisión: ${errorText}`);
      }

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

    if (Array.isArray(pendingReviews)) {
      pendingReviews.forEach(review => {
        sessions.push({
          id: review.id,
          type: 'pending',
          dueDate: review.dueDate,
          card: review.card,
          intervalDays: review.intervalDays
        });
      });
    }

    if (upcomingReviews && typeof upcomingReviews === 'object') {
      Object.values(upcomingReviews).forEach(dateGroup => {
        if (Array.isArray(dateGroup)) {
          dateGroup.forEach((review: UpcomingReviewItem) => {
            sessions.push({
              id: review.id,
              type: 'upcoming',
              dueDate: review.dueDate,
              card: review.card,
              intervalDays: review.intervalDays
            });
          });
        }
      });
    }

    return sessions.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  };

  useEffect(() => {
    fetchAllReviews();
  }, [fetchAllReviews]);

  return {
    pendingReviews,
    upcomingReviews,
    loading,
    error,
    fetchAllReviews,
    fetchPendingReviews,
    fetchUpcomingReviews,
    completeReview,
    rescheduleReview,
    getGroupedSessions,
  };
};