import { useState } from "react";
import { Card, CreateCardData, UpdateCardData } from "../src/types/cards";
import { useAuth } from "../src/context/AuthContext";
import { API_URL } from "../src/config";

const API_BASE_URL = API_URL || "http://localhost:3000/api";

export const useCards = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  //funcion para obtener token
  const getToken = () => {
    const token = localStorage.getItem("token");
    if (!token)
      throw new Error("No se encontró token. Por favor inicia sesión.");
    return token;
  };

  const fetchCardsByTopic = async (topicId: number): Promise<Card[]> => {
    if (!user) throw new Error("Usuario no autenticado");

    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/cards/topic/${topicId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Error al obtener tarjetas");

      const data = await response.json();
      const cardsArray: Card[] = data.cards || [];
      setCards(cardsArray);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setCards([]);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const searchCards = async (searchTerm: string): Promise<Card[]> => {
    if (!user) throw new Error("Usuario no autenticado");

    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const response = await fetch(
        `${API_BASE_URL}/cards/search?search=${encodeURIComponent(searchTerm)}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Error al buscar tarjetas");

      const data = await response.json();
      const cardsArray: Card[] = data.cards || [];
      setCards(cardsArray);
      return cardsArray;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      setCards([]);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Función para agregar una nueva tarjeta
  const addCard = async (cardData: CreateCardData): Promise<Card> => {
    if (!user) throw new Error("Usuario no autenticado");

    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      console.log("Enviando card con timezone:", timezone);
      console.log("Datos completos:", { ...cardData, timezone });
      console.log("Enviando solicitud para crear tarjeta:", cardData);
      const response = await fetch(`${API_BASE_URL}/cards`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...cardData, timezone }),
      });

      console.log(
        "Respuesta del servidor:",
        response.status,
        response.statusText
      );

      // if (!response.ok) throw new Error("Error al crear tarjeta");
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error del servidor:", errorText);
        let errorMessage = "Error al crear tarjeta";
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          errorMessage = errorText || errorMessage;
        }
        throw new Error(errorMessage);
      }

      const newCard = await response.json();
      setCards((prev) => [...prev, newCard.card]);
      return newCard.card;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCard = async (
    id: number,
    updates: UpdateCardData
  ): Promise<Card> => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error("Error al actualizar tarjeta");

      const updatedCard = await response.json();
      setCards(
        (prev) => prev.map((card) => (card.id === id ? updatedCard.card : card)) //api returns { card: updatedCard }
      );
      return updatedCard.card;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCard = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      const response = await fetch(`${API_BASE_URL}/cards/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error("Error al eliminar tarjeta");

      setCards((prev) => prev.filter((card) => card.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCards = () => {
    setCards([]);
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
    clearCards,
  };
};
