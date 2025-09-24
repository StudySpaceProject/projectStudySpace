import React, { useState } from 'react';
import { TopicItemProps } from '../types/topics';

export const TopicItem: React.FC<TopicItemProps> = ({ 
  topic, 
  onEdit, 
  onDelete, 
  onViewCards 
}) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (window.confirm(`¿Estás seguro de que quieres eliminar el tema "${topic.name}"? Esta acción no se puede deshacer.`)) {
      setIsDeleting(true);
      try {
        await onDelete(topic.id);
      } catch (error) {
        console.error('Error al eliminar tema:', error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleViewCards = () => {
    if (onViewCards) {
      onViewCards(topic.id);
    }
  };

  return (
    <div className="topic-item">
      <div className="topic-content">
        <h3>{topic.name}</h3>
        {topic.description && <p className="topic-description">{topic.description}</p>}
        {topic.category && <span className="topic-category">{topic.category}</span>}
        <div className="topic-meta">
          <small>Creado: {new Date(topic.createdAt).toLocaleDateString()}</small>
          <small>Actualizado: {new Date(topic.updatedAt).toLocaleDateString()}</small>
        </div>
      </div>
      <div className="topic-actions">
        <button onClick={() => onEdit(topic)} className="edit-btn">
          Editar
        </button>
        <button onClick={handleDelete} disabled={isDeleting} className="delete-btn">
          {isDeleting ? 'Eliminando...' : 'Eliminar'}
        </button>
        {onViewCards && (
          <button onClick={handleViewCards} className="view-cards-btn">
            Ver Tarjetas
          </button>
        )}
      </div>
    </div>
  );
};