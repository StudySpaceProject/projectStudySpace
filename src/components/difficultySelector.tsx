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
    <div className="w-full max-w-md mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 text-center px-2">
        ¿Qué tan bien recordaste esto?
      </h3>
      
      <div className="flex flex-col sm:grid sm:grid-cols-3 gap-3 sm:gap-4 w-full">
        {difficulties.map(({ level, label, icon: Icon, bgColor, borderColor, description }) => (
          <button
            key={level}
            onClick={() => onSelect(level as 1 | 2 | 3)}
            disabled={selectedDifficulty !== null}
            className={`w-full p-3 sm:p-4 rounded-xl text-white font-semibold transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed border-2 ${bgColor} ${borderColor} shadow-lg hover:shadow-xl min-h-[120px] sm:min-h-0`}
          >
            <div className="flex flex-col items-center gap-1 sm:gap-2">
              <Icon size={28} className="text-white sm:w-8 sm:h-8" />
              <div className="text-base sm:text-lg font-medium">{label}</div>
              <div className="text-xs sm:text-sm opacity-90 text-center leading-tight sm:leading-normal px-1">
                {description}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DifficultySelector;