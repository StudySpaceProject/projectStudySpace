import { useState } from 'react';
import { Topic, CreateTopicData, UpdateTopicData } from '../src/types/topics';

export const useTopics = (initialTopics: Topic[] = []) => {
  const [topics, setTopics] = useState<Topic[]>(initialTopics);

  // del backend
  const addTopic = (topicData: CreateTopicData) => {
    const newTopic: Topic = {
      ...topicData,
      id: Math.random().toString(36).substr(2, 9),  // del backend
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTopics([...topics, newTopic]);
    return newTopic;
  };

  // del backend
  const updateTopic = (id: string, updates: UpdateTopicData) => {  // revisar si ID es numérico
    setTopics(
      topics.map(topic =>
        topic.id === id
          ? { ...topic, ...updates, updatedAt: new Date() }
          : topic
      )
    );
  };

  // del backend
  const deleteTopic = (id: string) => {  // revisar si ID es numérico
    setTopics(topics.filter(topic => topic.id !== id));
  };

  return {
    topics,
    addTopic,
    updateTopic,
    deleteTopic,
  };
};