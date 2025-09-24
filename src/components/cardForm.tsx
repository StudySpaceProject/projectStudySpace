import React, { useState, useEffect } from 'react';
import { CardFormProps } from '../types/cards';

export const CardForm: React.FC<CardFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isEditing = false,
}) => {
  const [question, setQuestion] = useState(initialData?.question || '');
  const [answer, setAnswer] = useState(initialData?.answer || '');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question);
      setAnswer(initialData.answer);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      setIsSubmitting(true);
      try {
        await onSubmit({ question, answer });
        if (!isEditing) {
          setQuestion('');
          setAnswer('');
        }
      } catch (error) {
        console.error('Error al guardar tarjeta:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card-form">
      <div className="form-group">
        <label htmlFor="question">Pregunta:</label>
        <textarea
          id="question"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          rows={3}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-group">
        <label htmlFor="answer">Respuesta:</label>
        <textarea
          id="answer"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
          rows={3}
          required
          disabled={isSubmitting}
        />
      </div>
      <div className="form-actions">
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Guardando...' : (isEditing ? 'Actualizar' : 'Crear')} Tarjeta
        </button>
        <button type="button" onClick={onCancel} disabled={isSubmitting}>
          Cancelar
        </button>
      </div>
    </form>
  );
};