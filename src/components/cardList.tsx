import React from 'react';
import { CardListProps } from '../types/cards';
import { CardItem } from './CardItem';

export const CardList: React.FC<CardListProps> = ({ 
  cards, 
  onEdit, 
  onDelete 
}) => {
  if (cards.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay tarjetas creadas. Crea tu primera tarjeta para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="card-list">
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