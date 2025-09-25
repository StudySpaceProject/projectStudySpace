import React, { useState, useEffect } from 'react';
import { Topic } from '../types/topics';
import { useTopics } from '../../hooks/useTopics';
import { TopicList } from './topicList';
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

  if (loading) return <div className="text-center py-8 text-gray-600">Cargando materias...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-white">Materias de Estudio</h2>
        {!showForm && (
          <button onClick={handleCreateTopic} className="bg-white hover:bg-gray-100 text-purple-600 font-medium py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg">
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
