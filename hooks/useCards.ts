import { useState } from 'react';
import { Card, CreateCardData, UpdateCardData } from '../src/types/cards';
import { useAuth } from '../src/context/AuthContext';

const API_BASE_URL = 'http://localhost:3000/api';  // añadir al .env ¿?

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchCardsByTopic = async (topicId: string): Promise<Card[]> => {
    if (!user) throw new Error('Usuario no autenticado');
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/cards/topic/${topicId}`);
      if (!response.ok) throw new Error('Error al obtener tarjetas');
      
      const data = await response.json();
      setCards(data);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchCards = async (searchTerm: string): Promise<Card[]> => {
    if (!user) throw new Error('Usuario no autenticado');
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/cards/search/${user.id}?search=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) throw new Error('Error al buscar tarjetas');
      
      const data = await response.json();
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addCard = async (cardData: CreateCardData): Promise<Card> => {
    if (!user) throw new Error('Usuario no autenticado');
    
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/cards`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      });
      
      if (!response.ok) throw new Error('Error al crear tarjeta');
      
      const newCard = await response.json();
      setCards(prev => [...prev, newCard]);
      return newCard;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCard = async (id: string, updates: UpdateCardData): Promise<Card> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (!response.ok) throw new Error('Error al actualizar tarjeta');
      
      const updatedCard = await response.json();
      setCards(prev => prev.map(card => card.id === id ? updatedCard : card));
      return updatedCard;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (id: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Error al eliminar tarjeta');
      
      setCards(prev => prev.filter(card => card.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    cards,
    loading,
    error,
    fetchCardsByTopic,
    searchCards,
    addCard,
    updateCard,
    deleteCard,
  };
};