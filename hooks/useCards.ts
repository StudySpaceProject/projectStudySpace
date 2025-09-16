import { useState } from 'react';
import { Card, CreateCardData, UpdateCardData } from '../src/types/cards';

export const useCards = (initialCards: Card[] = []) => {
  const [cards, setCards] = useState<Card[]>(initialCards);

  const addCard = (cardData: CreateCardData) => {
    // Card debería venir desde el backend con POST
    const newCard: Card = {
      ...cardData,
      id: Math.random().toString(36).substr(2, 9), // El backend debería generar este ID
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCards([...cards, newCard]);
    return newCard;
  };

  // Debería hacerlo el backend con PUT
  const updateCard = (id: string, updates: UpdateCardData) => {
    setCards(
      cards.map(card =>
        card.id === id
          ? { ...card, ...updates, updatedAt: new Date() }
          : card
      )
    );
  };

  // Debería hacerlo el backend con DELETE
  const deleteCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  return {
    cards,
    addCard,
    updateCard,
    deleteCard,
  };
};