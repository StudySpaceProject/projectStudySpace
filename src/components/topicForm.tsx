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

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setDescription(initialData.description || '');
      setCategory(initialData.category || '');
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit({ 
        name, 
        description: description || undefined, 
        category: category || undefined
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="topic-form">
      <div className="form-group">
        <label>Nombre de la materia *</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="form-group">
        <label>Descripción</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      
      <div className="form-group">
        <label>Categoría (opcional)</label>
        <input
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
        />
      </div>
      
      <div className="form-actions">
        <button type="submit">
          {isEditing ? 'Actualizar' : 'Crear'} Materia
        </button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};