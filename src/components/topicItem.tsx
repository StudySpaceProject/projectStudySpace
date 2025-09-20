import React from 'react';
import { TopicItemProps } from '../types/topics';

export const TopicItem: React.FC<TopicItemProps> = ({ 
  topic, 
  onEdit, 
  onDelete, 
  onViewCards 
}) => {
  return (
    <div className="topic-item">
      <div className="topic-content">
        <h3>{topic.name}</h3>
        {topic.description && <p className="topic-description">{topic.description}</p>}
        {topic.category && <span className="topic-category">{topic.category}</span>}
        <div className="topic-meta">
          <small>Creado: {topic.createdAt.toLocaleDateString()}</small>
        </div>
      </div>
      <div className="topic-actions">
        <button onClick={() => onEdit(topic)}>Editar</button>
        <button onClick={() => onDelete(topic.id)}>Eliminar</button>
        {onViewCards && (
          <button onClick={() => onViewCards(topic.id)}>Ver Tarjetas</button>
        )}
      </div>
    </div>
  );
};