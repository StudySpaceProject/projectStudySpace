import { useState } from 'react';
import { Topic, CreateTopicData, UpdateTopicData } from '../src/types/topics';
import { useAuth } from '../src/context/AuthContext';

const API_BASE_URL = 'http://localhost:3000/api';  // añadir al .env ¿?

export const useTopics = () => {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchUserTopics = async (): Promise<Topic[]> => {
    if (!user) throw new Error('Usuario no autenticado');
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/topics/user/${user.id}`);
      if (!response.ok) throw new Error('Error al obtener temas');
      
      const data = await response.json();
      setTopics(data);
      return data;
    } catch (err) {
      console.warn('API no disponible, usando datos mock:', err);
      const mockTopics: Topic[] = [
        {
          id: 1,
          name: 'Matemáticas Avanzadas',
          description: 'Conceptos avanzados de matemáticas',
          userId: user.id || 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 2,
          name: 'Química Orgánica',
          description: 'Estudio de compuestos orgánicos',
          userId: user.id || 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 3,
          name: 'Historia Universal',
          description: 'Historia del mundo',
          userId: user.id || 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ];
      setTopics(mockTopics);
      setError(null);
      return mockTopics;
    } finally {
      setLoading(false);
    }
  };

  const searchTopics = async (searchTerm: string): Promise<Topic[]> => {
    if (!user) throw new Error('Usuario no autenticado');
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/topics/search/${user.id}?search=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error('Error al buscar temas');
      
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addTopic = async (topicData: CreateTopicData): Promise<Topic> => {
    if (!user) throw new Error('Usuario no autenticado');
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/topics`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...topicData,
          userId: user.id
        }),
      });
      
      if (!response.ok) throw new Error('Error al crear tema');
      
      const newTopic = await response.json();
      setTopics(prev => [...prev, newTopic]);
      return newTopic;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTopic = async (id: number, updates: UpdateTopicData): Promise<Topic> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/topics/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) throw new Error('Error al actualizar tema');
      
      const updatedTopic = await response.json();
      setTopics(prev => prev.map(topic => topic.id === id ? updatedTopic : topic));
      return updatedTopic;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTopic = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/topics/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Error al eliminar tema');
      
      setTopics(prev => prev.filter(topic => topic.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const getTopicById = async (id: number): Promise<Topic> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/topics/${id}`);
      if (!response.ok) throw new Error('Error al obtener tema');
      
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    topics,
    loading,
    error,
    fetchUserTopics,
    searchTopics,
    addTopic,
    updateTopic,
    deleteTopic,
    getTopicById,
  };
};