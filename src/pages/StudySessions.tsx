import React, { useEffect } from 'react';
import SpacedRepetitionDashboard from '../components/spacedRepetitionDashboard';
import { useReviews } from '../../hooks/useReviews';

const StudySessions = () => {
  const { fetchAllReviews } = useReviews();

  useEffect(() => {
    fetchAllReviews();
  }, []);
  
  return (
    <div className="min-h-screen bg-gray-50 p-4 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <SpacedRepetitionDashboard />
      </div>
    </div>
  );
};

export default StudySessions;