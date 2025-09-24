export interface Card {
  id: number;
  question: string;
  answer: string;
  topicId: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CardItemProps {
  card: Card;
  onEdit: (card: Card) => void;
  onDelete: (cardId: number) => void;
}

export interface CardFormProps {
  onSubmit: (card: { question: string; answer: string }) => void;
  onCancel: () => void;
  initialData?: { question: string; answer: string };
  isEditing?: boolean;
}

export interface CardListProps {
  cards: Card[];
  onEdit: (card: Card) => void;
  onDelete: (cardId: number) => void;
  topicId: number;
}

export interface CardsManagerProps {
  topicId: number;
}

export type CreateCardData = Omit<Card, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCardData = Partial<Omit<Card, 'id' | 'createdAt' | 'updatedAt'>>;