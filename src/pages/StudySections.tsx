import React, { useState, useEffect } from 'react';
import { useCards } from '../../hooks/useCards';
import { CardItem } from '../components/cardItem';
import { Card } from '../types/cards';

const StudySections: React.FC = () => {
  const { cards, loading, error, searchCards } = useCards();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAllCards = async () => {
      try {
        await searchCards(''); // Empty search to get all cards
      } catch (err) {
        console.error('Error fetching cards:', err);
      }
    };
    fetchAllCards();
  }, []);

  const handleSearch = async (term: string) => {
    setSearchTerm(term);
    try {
      await searchCards(term);
    } catch (err) {
      console.error('Error searching cards:', err);
    }
  };

  const handleEdit = (card: Card) => {
    // For now, just log; can implement edit later
    console.log('Edit card:', card);
  };

  const handleDelete = (cardId: number) => {
    // For now, just log; can implement delete later
    console.log('Delete card:', cardId);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Sesiones de Estudio</h1>
        
        {/* Search Input */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Buscar tarjetas..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>

        {/* Loading */}
        {loading && <p className="text-center text-gray-500">Cargando tarjetas...</p>}

        {/* Error */}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Cards List */}
        {!loading && !error && (
          <div className="space-y-4">
            {cards.length === 0 ? (
              <p className="text-center text-gray-500">No hay tarjetas disponibles.</p>
            ) : (
              cards.map((card) => (
                <CardItem
                  key={card.id}
                  card={card}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudySections;
