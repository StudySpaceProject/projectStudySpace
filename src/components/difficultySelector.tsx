import React from 'react';
import { Smile, Meh, Frown } from 'lucide-react';

interface DifficultySelectorProps {
  selectedDifficulty: 1 | 2 | 3 | null;
  onSelect: (difficulty: 1 | 2 | 3) => void;
}

const DifficultySelector: React.FC<DifficultySelectorProps> = ({
  selectedDifficulty,
  onSelect,
}) => {
  const difficulties = [
    { 
      level: 1, 
      label: 'Fácil', 
      icon: Smile,
      bgColor: 'bg-green-500 hover:bg-green-600',
      borderColor: 'border-green-200',
      description: 'Lo recordé fácilmente' 
    },
    { 
      level: 2, 
      label: 'Medio', 
      icon: Meh,
      bgColor: 'bg-orange-500 hover:bg-orange-600', 
      borderColor: 'border-orange-200',
      description: 'Me costó un poco' 
    },
    { 
      level: 3, 
      label: 'Difícil', 
      icon: Frown,
      bgColor: 'bg-red-500 hover:bg-red-600', 
      borderColor: 'border-red-200',
      description: 'No lo recordé bien' 
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 text-center">
        ¿Qué tan bien recordaste esto?
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {difficulties.map(({ level, label, icon: Icon, bgColor, borderColor, description }) => (
          <button
            key={level}
            onClick={() => onSelect(level as 1 | 2 | 3)}
            disabled={selectedDifficulty !== null}
            className={`p-4 rounded-xl text-white font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-2 ${bgColor} ${borderColor} shadow-lg hover:shadow-xl`}
          >
            <div className="flex flex-col items-center gap-2">
              <Icon size={32} className="text-white" />
              <div className="text-lg">{label}</div>
              <div className="text-sm opacity-90 text-center">{description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;