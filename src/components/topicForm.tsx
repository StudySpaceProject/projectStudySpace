import React, { useState, useEffect } from 'react';
import { TopicFormProps } from '../types/topics';

export const TopicForm: React.FC<TopicFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
      setCategory(initialData.category || '');
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsSubmitting(true);
      try {
        await onSubmit({ 
          name, 
          description: description || undefined, 
          category: category || undefined
        });
      } catch (error) {
        console.error('Error al guardar tema:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 border-2 border-purple-300 max-w-md mx-auto space-y-4">
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la materia *</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          disabled={isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Descripción</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          disabled={isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Categoría (opcional)</label>
        <input
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
          disabled={isSubmitting}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 disabled:bg-gray-100"
        />
      </div>
      <div className="flex gap-3 justify-end">
        <button type="submit" disabled={isSubmitting} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:bg-indigo-300">
          {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')} Materia
        </button>
        <button type="button" onClick={onCancel} disabled={isSubmitting} className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-md font-medium transition-colors">
          Cancelar
        </button>
      </div>
    </form>
  );
};