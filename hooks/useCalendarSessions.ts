import { useState, useEffect, useCallback } from 'react';
import { StudySessionCalendar } from '../src/types/reviews';
import { API_URL } from "../src/config";

const API_BASE = API_URL || "http://localhost:3000/api";

export const useCalendarSessions = () => {
  const [sessions, setSessions] = useState<StudySessionCalendar[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCalendarSessions = useCallback(async (days: number = 30) => {
    try {
      setLoading(true);
      
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_BASE}/reviews/upcoming?days=${days}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        setSessions([]);
        return [];
      }

      const data = await response.json();
      
      const allSessions: StudySessionCalendar[] = [];
      if (data.upcomingReviews && typeof data.upcomingReviews === 'object') {
        Object.values(data.upcomingReviews).forEach((dateGroup: any) => {
          if (Array.isArray(dateGroup)) {
            dateGroup.forEach((session: any) => {
              allSessions.push({
                id: session.id,
                dueDate: session.dueDate,
                card: session.card,
                intervalDays: session.intervalDays
              });
            });
          }
        });
      }
      
      setSessions(allSessions);
      return allSessions;
    } catch (err) {
      setSessions([]);
      return [];
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCalendarSessions();
  }, [fetchCalendarSessions]);

  return {
    sessions,
    loading
  };
};