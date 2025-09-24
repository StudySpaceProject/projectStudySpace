export interface Topic {
  id: number;
  name: string;
  description?: string;
  category?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface TopicItemProps {
  topic: Topic;
  onEdit: (topic: Topic) => void;
  onDelete: (topicId: number) => void;
  onViewCards?: (topicId: number) => void;
}

export interface TopicFormProps {
  onSubmit: (topic: { name: string; description?: string; category?: string }) => void;
  onCancel: () => void;
  initialData?: Topic;
  isEditing?: boolean;
}

export interface TopicListProps {
  topics: Topic[];
  onEdit: (topic: Topic) => void;
  onDelete: (topicId: number) => void;
  onViewCards?: (topicId: number) => void;  // para navegar a las tarjetas del tema
}

export type CreateTopicData = Omit<Topic, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateTopicData = Partial<CreateTopicData>;