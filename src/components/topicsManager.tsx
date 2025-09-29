import React, { useState, useEffect } from 'react';
import { Topic, CreateTopicData, UpdateTopicData } from '../types/topics';
import { useTopics } from '../../hooks/useTopics';
import { TopicList } from './topicList';
import { TopicForm } from './topicForm';

interface TopicsManagerProps {
  onSelectTopic?: (topicId: number) => void;
  onTopicsChange?: (topics: Topic[]) => void;
}

export const TopicsManager: React.FC<TopicsManagerProps> = ({ onSelectTopic, onTopicsChange }) => {
  const [showForm, setShowForm] = useState(false);
  const [editingTopic, setEditingTopic] = useState<Topic | undefined>();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

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
        if (onTopicsChange) onTopicsChange(topics.map(t => t.id === updatedTopic.id ? updatedTopic : t));
      } else {
        const newTopic = await addTopic(topicData as CreateTopicData);
        if (onTopicsChange) onTopicsChange([...topics, newTopic]);
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
      if (onTopicsChange) onTopicsChange(topics.filter(t => t.id !== topicId));
    } catch (error) {
      console.error('Error al eliminar tema:', error);
    }
  };

  const handleViewCards = (topicId: number) => onSelectTopic?.(topicId);
  const handleCancel = () => {
    setShowForm(false);
    setEditingTopic(undefined);
  };

  const difficultyToColorMap: Record<string, string> = {
    easy: "#10B981",
    medium: "#F59E0B",
    hard: "#EF4444",
  };

  // Filtrar topics según búsqueda y dificultad
  const filteredTopics = topics.filter(
    t =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (activeFilter === 'all' || t.color === difficultyToColorMap[activeFilter])
  );

  if (loading) return <div className="text-center py-8 text-gray-600">Cargando materias...</div>;
  if (error) return <div className="text-center py-8 text-red-600">Error: {error}</div>;

  return (
    <div className="space-y-4">
      {/* Header con filtros al lado */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4 bg-gradient-to-r from-purple-500 to-indigo-500 p-4 rounded-lg shadow-lg">
        <div className="flex items-center gap-4 flex-wrap">
          <h2 className="text-xl font-bold text-white">Materias de Estudio</h2>
          <div className="flex gap-2 flex-wrap">
            {['all', 'easy', 'medium', 'hard'].map(level => {
              const colors = { all: 'bg-indigo-500', easy: 'bg-green-500', medium: 'bg-yellow-500', hard: 'bg-red-500' };
              return (
                <button
                  key={level}
                  onClick={() => setActiveFilter(level as any)}
                  className={`px-4 py-2 rounded font-medium text-white transition-colors ${activeFilter === level ? colors[level as keyof typeof colors] : 'bg-gray-200 text-gray-700'}`}
                >
                  {level === 'all' ? 'Todos' : level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              );
            })}
          </div>
        </div>

        {!showForm && (
          <button
            onClick={handleCreateTopic}
            className="bg-white hover:bg-gray-100 text-purple-600 font-medium py-2 px-4 rounded-lg transition-colors shadow-md hover:shadow-lg"
          >
            + Nueva Materia
          </button>
        )}
      </div>

      {/* Barra de búsqueda */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar materias..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      {/* Formulario o lista */}
      {showForm ? (
        <TopicForm
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          initialData={editingTopic}
          isEditing={!!editingTopic}
        />
      ) : (
        <TopicList
          topics={filteredTopics}
          onEdit={handleEditTopic}
          onDelete={handleDeleteTopic}
          onViewCards={onSelectTopic ? handleViewCards : undefined}
        />
      )}
    </div>
  );
};
