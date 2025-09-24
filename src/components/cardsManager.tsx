import React, { useState, useEffect } from 'react';
import { Card } from '../types/cards';
import { useCards } from '../../hooks/useCards';
import { CardList } from './cardList';
import { CardForm } from './CardForm';
import { CardsManagerProps } from '../types/cards';

export const CardsManager: React.FC<CardsManagerProps> = ({ topicId }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | undefined>();
  const { cards, loading, error, fetchCardsByTopic, addCard, updateCard, deleteCard } = useCards();

  useEffect(() => {
    if (topicId) {
      fetchCardsByTopic(topicId);
    }
  }, [topicId]);

  const handleCreateCard = () => {
    setEditingCard(undefined);
    setShowForm(true);
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card);
    setShowForm(true);
  };

  const handleSubmit = async (cardData: { question: string; answer: string }) => {
    try {
      if (editingCard) {
        await updateCard(editingCard.id, cardData);
      } else {
        await addCard({ ...cardData, topicId });
      }
      setShowForm(false);
      setEditingCard(undefined);
    } catch (error) {
      console.error('Error al guardar tarjeta:', error);
    }
  };

  const handleDeleteCard = async (cardId: number) => {
    try {
      await deleteCard(cardId);
    } catch (error) {
      console.error('Error al eliminar tarjeta:', error);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCard(undefined);
  };

  if (loading) return <div className="loading">Cargando tarjetas...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="cards-manager">
      <div className="cards-header">
        <h2>Tarjetas de Estudio</h2>
        {!showForm && (
          <button onClick={handleCreateCard} className="btn-primary">
            + Nueva Tarjeta
          </button>
        )}
      </div>
      
      {showForm ? (
        <CardForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={editingCard}
          isEditing={!!editingCard}
        />
      ) : (
        <CardList
          cards={cards}
          onEdit={handleEditCard}
          onDelete={handleDeleteCard}
          topicId={topicId}
        />
      )}
    </div>
  );
};