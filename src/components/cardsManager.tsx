import React, { useState, useEffect } from 'react';
import { Card } from '../types/cards';
import { useCards } from '../../hooks/useCards';
import { CardList } from './cardList';
import { CardForm } from './cardForm';
import { CardsManagerProps } from '../types/cards';

export const CardsManager: React.FC<CardsManagerProps> = ({ topicId }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | undefined>();
  const { cards, loading, error, fetchCardsByTopic, addCard, updateCard, deleteCard } = useCards();

  useEffect(() => {
    if (topicId) {
      fetchCardsByTopic(topicId).catch(error => console.error('Error fetching cards:', error));
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

  if (loading) return <div className="text-center py-8 text-gray-600">Cargando tarjetas...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Tarjetas de Estudio</h2>
        {!showForm && (
          <button onClick={handleCreateCard} className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg transition-colors">
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
