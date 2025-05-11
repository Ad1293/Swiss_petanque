import React, { useState } from 'react';

const MatchCard = ({ match, onSaveResult, round }) => {
  const [score1, setScore1] = useState(match.score1 || 0);
  const [score2, setScore2] = useState(match.score2 || 0);

  const handleSave = () => {
    onSaveResult({
      ...match,
      score1: parseInt(score1),
      score2: parseInt(score2),
      completed: true
    });
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">Ronda {round}</span>
        {match.completed && (
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            Finalizado
          </span>
        )}
      </div>
      <div className="flex justify-between items-center mb-4">
        <span>{match.player1.name}</span>
        <span className="font-bold">
          {match.completed ? `${match.score1} - ${match.score2}` : 'vs'}
        </span>
        <span>{match.player2.name}</span>
      </div>
      {!match.completed && (
        <div className="flex flex-col space-y-3">
          <div className="flex items-center justify-between">
            <span>{match.player1.name}</span>
            <input
              type="number"
              value={score1}
              onChange={(e) => setScore1(e.target.value)}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
              min="0"
            />
          </div>
          <div className="flex items-center justify-between">
            <span>{match.player2.name}</span>
            <input
              type="number"
              value={score2}
              onChange={(e) => setScore2(e.target.value)}
              className="w-16 px-2 py-1 border border-gray-300 rounded-md text-center"
              min="0"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white py-1 px-4 rounded-md hover:bg-blue-700 transition-colors self-end"
          >
            Guardar
          </button>
        </div>
      )}
    </div>
  );
};

export default MatchCard;