import React, { useState } from 'react';
import { Topic } from '../types/topics';
import { useTopics } from '../../hooks/useTopics';
import { TopicList } from './TopicList';
import { TopicForm } from './topicForm';

interface TopicsManagerProps {
  onSelectTopic?: (topicId: string) => void;
}

export const TopicsManager: React.FC<TopicsManagerProps> = ({ onSelectTopic }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | undefined>();
  const { topics, addTopic, updateTopic, deleteTopic } = useTopics();

  const handleCreateTopic = () => {
    setEditingTopic(undefined);
    setShowForm(true);
  };

  const handleEditTopic = (topic: Topic) => {
    setEditingTopic(topic);
    setShowForm(true);
  };

  const handleSubmit = (topicData: { name: string; description?: string; category?: string }) => {
    if (editingTopic) {
      updateTopic(editingTopic.id, topicData);
    } else {
      addTopic(topicData);
    }
    setShowForm(false);
    setEditingTopic(undefined);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTopic(undefined);
  };

  const handleViewCards = (topicId: string) => {  // Revisar si es numérico
    if (onSelectTopic) {
      onSelectTopic(topicId);
    }
  };

  return (
    <div className="topics-manager">
      <div className="topics-header">
        <h2>Materias de Estudio</h2>
        {!showForm && (
          <button onClick={handleCreateTopic} className="btn-primary">
            + Nueva Materia
          </button>
        )}
      </div>
      
      {showForm ? (
        <TopicForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={editingTopic}
          isEditing={!!editingTopic}
        />
      ) : (
        <TopicList
          topics={topics}
          onEdit={handleEditTopic}
          onDelete={deleteTopic}
          onViewCards={onSelectTopic ? handleViewCards : undefined}
        />
      )}
    </div>
  );
};