import React, { useState, useEffect } from 'react';
import { Topic } from '../types/topics';
import { useTopics } from '../../hooks/useTopics';
import { TopicList } from './TopicList';
import { TopicForm } from './topicForm';

interface TopicsManagerProps {
  onSelectTopic?: (topicId: number) => void;
}

export const TopicsManager: React.FC<TopicsManagerProps> = ({ onSelectTopic }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | undefined>();
  const { topics, loading, error, fetchUserTopics, addTopic, updateTopic, deleteTopic } = useTopics();

  useEffect(() => {
    fetchUserTopics();
  }, []);

  const handleCreateTopic = () => {
    setEditingTopic(undefined);
    setShowForm(true);
  };

  const handleEditTopic = (topic: Topic) => {
    setEditingTopic(topic);
    setShowForm(true);
  };

  const handleSubmit = async (topicData: { name: string; description?: string; category?: string }) => {
    try {
      if (editingTopic) {
        await updateTopic(editingTopic.id, topicData);
      } else {
        await addTopic(topicData);
      }
      setShowForm(false);
      setEditingTopic(undefined);
    } catch (error) {
      console.error('Error al guardar tema:', error);
    }
  };

  const handleDeleteTopic = async (topicId: number) => {
    try {
      await deleteTopic(topicId);
    } catch (error) {
      console.error('Error al eliminar tema:', error);
    }
  };

  const handleViewCards = (topicId: number) => {
    if (onSelectTopic) {
      onSelectTopic(topicId);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTopic(undefined);
  };

  if (loading) return <div className="loading">Cargando materias...</div>;
  if (error) return <div className="error">Error: {error}</div>;

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
          onDelete={handleDeleteTopic}
          onViewCards={onSelectTopic ? handleViewCards : undefined}
        />
      )}
    </div>
  );
};