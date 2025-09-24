import React, { useState } from 'react';
import { Card } from '../types/cards';
import { useCards } from '../../hooks/useCards';
import { CardList } from './cardList';
import { CardForm } from './CardForm';
import { CardsManagerProps } from '../types/cards';

export const CardsManager: React.FC<CardsManagerProps> = ({ topicId }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingCard, setEditingCard] = useState<Card | undefined>();
  const { cards, addCard, updateCard, deleteCard } = useCards();

  const filteredCards = cards.filter(card => card.topicId === topicId);

  const handleCreateCard = () => {
    setEditingCard(undefined);
    setShowForm(true);
  };

  const handleEditCard = (card: Card) => {
    setEditingCard(card);
    setShowForm(true);
  };

  const handleSubmit = (cardData: { question: string; answer: string }) => {
    if (editingCard) {
      updateCard(editingCard.id, cardData);
    } else {
      addCard({ ...cardData, topicId });
    }
    setShowForm(false);
    setEditingCard(undefined);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingCard(undefined);
  };

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
          cards={filteredCards}
          onEdit={handleEditCard}
          onDelete={deleteCard}
<<<<<<< HEAD
=======
          topicId={topicId}
>>>>>>> rama-amr
        />
      )}
    </div>
  );
};