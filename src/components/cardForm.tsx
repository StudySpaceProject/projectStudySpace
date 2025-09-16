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

  useEffect(() => {
    if (initialData) {
      setQuestion(initialData.question);
      setAnswer(initialData.answer);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && answer.trim()) {
      onSubmit({ question, answer });
      setQuestion('');
      setAnswer('');
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
        />
      </div>
      <div className="form-actions">
        <button type="submit">
          {isEditing ? 'Actualizar' : 'Crear'} Tarjeta
        </button>
        <button type="button" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
};