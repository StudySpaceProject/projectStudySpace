import React, { useState, useEffect } from 'react';
import { Topic, CreateTopicData, UpdateTopicData } from '../types/topics';
import { useTopics } from '../../hooks/useTopics';
import { TopicList } from './topicList';
import { TopicForm } from './topicForm';

interface TopicsManagerProps {
  onSelectTopic?: (topicId: number) => void;
  onTopicsChange?: (topics: Topic[]) => void; // actualizar Dashboard
}

export const TopicsManager: React.FC<TopicsManagerProps> = ({ onSelectTopic, onTopicsChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | undefined>();
  const { topics, loading, error, fetchUserTopics, addTopic, updateTopic, deleteTopic } = useTopics();

  useEffect(() => {
    fetchUserTopics().then(fetched => {
      if (onTopicsChange) onTopicsChange(fetched);
    });
  }, []);

  const handleCreateTopic = () => {
    setEditingTopic(undefined);
    setShowForm(true);
  };

  const handleEditTopic = (topic: Topic) => {
    setEditingTopic(topic);
    setShowForm(true);
  };

  const handleSubmit = async (topicData: CreateTopicData | UpdateTopicData) => {
    try {
      if (editingTopic) {
        const updatedTopic = await updateTopic(editingTopic.id, topicData as UpdateTopicData);
        if (onTopicsChange) {
          onTopicsChange(topics.map(t => t.id === updatedTopic.id ? updatedTopic : t));
        }
      } else {
        const newTopic = await addTopic(topicData as CreateTopicData);
        if (onTopicsChange) {
          onTopicsChange([...topics, newTopic]);
        }
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
      if (onTopicsChange) {
        onTopicsChange(topics.filter(t => t.id !== topicId));
      }
    } catch (error) {
      console.error('Error al eliminar tema:', error);
    }
  };

  const handleViewCards = (topicId: number) => {
    onSelectTopic?.(topicId);
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
          <button
            onClick={handleCreateTopic}
            className="bg-white hover:bg-gray-100 text-purple-600 font-medium py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
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
