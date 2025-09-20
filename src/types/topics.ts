export interface Topic {
    id: string;  // Revisar si ID es numérico en backend
    name: string;
    description?: string;
    category?: string;
    createdAt: Date;
    updatedAt: Date;
  }

  export type CreateTopicData = Omit<Topic, 'id' | 'createdAt' | 'updatedAt'>;
  export type UpdateTopicData = Partial<CreateTopicData>;