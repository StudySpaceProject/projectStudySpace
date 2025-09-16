export interface Card {
    id: string;  // Habrá que cambiarlo si en el backend es numérico
    question: string;
    answer: string;
    topicId: string;  // Revisar si en el backend es numérico (filtrado de tarjetas por tema)
    createdAt: Date;
    updatedAt: Date;
  }

export interface CardItemProps {
    card: Card;
    onEdit: (card: Card) => void;
    onDelete: (cardId: string) => void;  // Revisar si en el backend, el ID es numérico
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
    onDelete: (cardId: string) => void;  // Revisar si en el backend el ID es numérico
    topicId: string;  // Revisar si en el backend es numérico (filtrado de tarjetas por tema)
  }


export type CreateCardData = Omit<Card, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateCardData = Partial<Omit<Card, 'id' | 'createdAt' | 'updatedAt'>>;