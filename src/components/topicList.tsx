import React from 'react';
import { TopicListProps } from '../types/topics';
import { TopicItem } from './topicItem';

export const TopicList: React.FC<TopicListProps> = ({ 
  topics, 
  onEdit, 
  onDelete, 
  onViewCards 
}) => {
  if (topics.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No hay materias creadas. Crea tu primera materia para comenzar.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
      <div className="text-lg font-bold text-gray-900 mb-4">
        <h3>Tus Materias ({topics.length})</h3>
      </div>
      <div className="space-y-4">
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
    </div>
  );
};