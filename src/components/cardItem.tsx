import React, { useState } from 'react';
import { CardItemProps } from '../types/cards';

export const CardItem: React.FC<CardItemProps> = ({ card, onEdit, onDelete }) => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm('¿Estás seguro de que quieres eliminar esta tarjeta?')) {
      setIsDeleting(true);
      try {
        await onDelete(card.id);
      } catch (error) {
        console.error('Error al eliminar tarjeta:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="card-item">
      <div className="card-content">
        <h3>{card.question}</h3>
        {showAnswer && <p>{card.answer}</p>}
        <button 
          onClick={() => setShowAnswer(!showAnswer)}
          className="toggle-answer-btn"
        >
          {showAnswer ? 'Ocultar' : 'Mostrar'} respuesta
        </button>
      </div>
      <div className="card-actions">
        <button 
          onClick={() => onEdit(card)}
          className="edit-btn"
        >
          Editar
        </button>
        <button 
          onClick={handleDelete} 
          disabled={isDeleting}
          className="delete-btn"
        >
          {isDeleting ? 'Eliminando...' : 'Eliminar'}
        </button>
      </div>
    </div>
  );
};