import React from 'react';
import { CardListProps } from '../types/cards';
import { CardItem } from './cardItem';

export const CardList: React.FC<CardListProps> = ({ 
  cards, 
  onEdit, 
  onDelete,
  topicId 
}) => {
  if (cards.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No hay tarjetas creadas en este tema. Crea tu primera tarjeta para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="text-lg font-bold text-gray-900 mb-4">
        <h3>Tarjetas del tema ({cards.length})</h3>
      </div>
      <div className="space-y-4">
        {cards.map(card => (
          <CardItem
            key={card.id}
            card={card}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};