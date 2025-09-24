import React from 'react';
import { CardListProps } from '../types/cards';
import { CardItem } from './CardItem';

export const CardList: React.FC<CardListProps> = ({ 
  cards, 
  onEdit, 
  onDelete,
  topicId 
}) => {
  if (cards.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay tarjetas creadas en este tema. Crea tu primera tarjeta para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="card-list">
      <div className="card-list-header">
        <h3>Tarjetas del tema ({cards.length})</h3>
      </div>
      {cards.map(card => (
        <CardItem
          key={card.id}
          card={card}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};