import React, { useState } from 'react';
import { CardItemProps, Card } from '../types/cards'

export const CardItem: React.FC<CardItemProps> = ({ card, onEdit, onDelete }) => {
  const [showAnswer, setShowAnswer] = useState(false);

  return (
    <div className="card-item">
      <div className="card-content">
        <h3>{card.question}</h3>
        {showAnswer && <p>{card.answer}</p>}
        <button onClick={() => setShowAnswer(!showAnswer)}>
          {showAnswer ? 'Ocultar' : 'Mostrar'} respuesta
        </button>
      </div>
      <div className="card-actions">
        <button onClick={() => onEdit(card)}>Editar</button>
        <button onClick={() => onDelete(card.id)}>Eliminar</button>
      </div>
    </div>
  );
};