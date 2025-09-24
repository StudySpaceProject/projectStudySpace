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
    <form onSubmit={handleSubmit} className="topic-form">
      <div className="form-group">
        <label>Nombre de la materia *</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          required
          disabled={isSubmitting}
        />
      </div>
      
      <div className="form-group">
        <label>Descripción</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          disabled={isSubmitting}
        />
      </div>
      
      <div className="form-group">
        <label>Categoría (opcional)</label>
        <input
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
          disabled={isSubmitting}
        />
      </div>
      
      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')} Materia
        </button>
        <button type="button" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </button>
      </div>
    </form>
  );
};