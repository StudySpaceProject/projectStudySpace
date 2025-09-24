import React from 'react';
import { TopicListProps } from '../types/topics';
import { TopicItem } from './TopicItem';

export const TopicList: React.FC<TopicListProps> = ({ 
  topics, 
  onEdit, 
  onDelete, 
  onViewCards 
}) => {
  if (topics.length === 0) {
    return (
      <div className="empty-state">
        <p>No hay materias creadas. Crea tu primera materia para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="topic-list">
      <div className="topic-list-header">
        <h3>Tus Materias ({topics.length})</h3>
      </div>
      {topics.map(topic => (
        <TopicItem
          key={topic.id}
          topic={topic}
          onEdit={onEdit}
          onDelete={onDelete}
          onViewCards={onViewCards}
        />
      ))}
    </div>
  );
};